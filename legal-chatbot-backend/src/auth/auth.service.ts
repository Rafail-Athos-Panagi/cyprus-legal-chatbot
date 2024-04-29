import {
  ForbiddenException,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';

import { SignInDto, SignUpDto } from './dto';
import { JwtPayload, Tokens, signInData } from './types';
import { MailerService } from '@nestjs-modules/mailer';

import * as crypto from 'crypto';
import { ActivateAccountDto } from './dto/activate-account.dto';
import { verificationCodeTemplate } from './email-template/verificationCodeTemplate';
import { EmailCheckDto } from './dto/email-check.dto';
import { SendActivationCodeDto } from './dto/send-activation-code.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { forgetPasswordTemplate } from './email-template/forgetPasswordTemplate';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Observable, catchError, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';

const EXPIRE_TIME = 100 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    private readonly mailerService: MailerService,
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async signupLocal(dto: SignUpDto) {
    const hash = await argon.hash(dto.password);

    const user = await this.prisma.user
      .create({
        data: {
          email: dto.email,
          hash,
          activate: false,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect');
          }
        }
        throw error;
      });

    await this.prisma.userDetails
      .create({
        data: {
          userId: user.userId,
          firstName: dto.firstName,
          lastName: dto.lastName,
          dateOfBirth: new Date(dto.dateOfBirth),
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect');
          }
        }
        throw error;
      });

    const activationCode = this.generateActivationCode();

    this.sendActivationCode({ email: dto.email }, activationCode);
  }

  async signinLocal(dto: SignInDto): Promise<signInData> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new NotFoundException('Access Denied');
    }

    const userDetails = await this.prisma.userDetails.findUnique({
      where: {
        userId: user?.userId,
      },
    });

    const passwordMatches = await argon.verify(user.hash, dto.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid Email or Password');
    } else {
      if (!user.activate) {
        this.sendActivationCode({ email: dto.email });
        throw new NotAcceptableException('Not verified user');
      }
    }

    const tokens = await this.getTokens(user.userId, user.email);
    await this.updateRtHash(user.userId, tokens.refresh_token);

    const signInData = {
      user: {
        id: user.userId,
        name: `${userDetails?.firstName}`,
        surname: `${userDetails?.lastName}`,
        email: user.email,
        dateOfBirth: userDetails?.dateOfBirth,
        activate: user.activate,
      },
      backendTokens: tokens,
    };

    return signInData;
  }

  async logout(userId: number): Promise<boolean> {
    /* console.log(userId) */
    await this.prisma.user.updateMany({
      where: {
        userId: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    return true;
  }

  async refreshTokens(userId: number, rt: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });
    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.userId, user.email);
    await this.updateRtHash(user.userId, tokens.refresh_token);

    return tokens;
  }

  async sendActivationCode(dto: SendActivationCodeDto, rngNumber?: number) {
    let randomNumber = 0;
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');
    if (!rngNumber) {
      randomNumber = this.generateActivationCode();
    } else {
      randomNumber = rngNumber;
    }

    await this.mailerService.sendMail({
      to: user.email,
      from: process.env.EMAIL_USERNAME,
      subject: 'Activate Your Account',
      html: verificationCodeTemplate(randomNumber),
    });

    await this.cacheManager.set(
      `${dto.email}`,
      {
        code: randomNumber,
      },
      60 * 1000,
    );
  }

  async activateAccount(dto: ActivateAccountDto): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new NotFoundException('Not Found User');
    }

    const cachedCode: any = await this.cacheManager.get(`${dto.email}`);

    if (!cachedCode) {
      throw new ForbiddenException('Code Expired');
    }

    if (Number(dto.actCode) !== cachedCode.code) {
      throw new ForbiddenException('Credentials incorrect');
    } else {
      await this.prisma.user.update({
        where: {
          userId: user.userId,
        },
        data: { activate: true },
      });

      return true;
    }
  }

  async checkEmail(dto: EmailCheckDto): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) {
      throw new UnauthorizedException('Email is already registered');
    } else {
      return true;
    }
  }

  async forgetPassword(dto: EmailCheckDto): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new NotFoundException('Not Found User');
    } else {
      const jwtPayload: JwtPayload = {
        sub: user.userId,
        email: user.email,
      };

      const [rpt] = await Promise.all([
        this.jwtService.signAsync(jwtPayload, {
          secret: this.config.get<string>('AT_SECRET'),
          expiresIn: '60s',
        }),
      ]);

      await this.mailerService.sendMail({
        to: user.email,
        from: process.env.EMAIL_USERNAME,
        subject: 'Reset Password',
        html: forgetPasswordTemplate(rpt),
      });
    }

    return true;
  }

  async resetPassword(userId: number, dto: ResetPasswordDto): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('Not Found User');
    } else {
      const hash = await argon.hash(dto.password);
      await this.prisma.user.update({
        where: {
          userId: userId,
        },
        data: {
          hash,
        },
      });
      return true;
    }
  }

  modelData(string: string): Observable<any> {
    console.log('Request Data:', string);

    const apiUrl = 'http://127.0.0.1:8000/query';

    return this.httpService.post(apiUrl, string).pipe(
      map((response: AxiosResponse<any>) => {
        console.log('Response Data:', response.data);
        return response.data; // Extracting data from the response
      }),
      catchError((error) => {
        console.error('Error in modelData:', error);
        throw error;
      }),
    );
  }

  async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '3d',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }

  generateActivationCode(): number {
    const randomBytes = crypto.randomBytes(3);
    const randomNumber = parseInt(randomBytes.toString('hex'), 16) % 1000000;
    return randomNumber;
  }
}
