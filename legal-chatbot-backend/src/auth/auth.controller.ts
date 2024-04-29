import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { Public, GetCurrentUserId, GetCurrentUser } from '../common/decorators';
import { AtGuard, RtGuard } from '../common/guards';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { Tokens, signInData, ActivationCode } from './types';
import { ActivateAccountDto } from './dto/activate-account.dto';
import { EmailCheckDto } from './dto/email-check.dto';
import { SendActivationCodeDto } from './dto/send-activation-code.dto';
import { SkipThrottle } from '@nestjs/throttler';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipThrottle({ default: true })
  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: SignUpDto) {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: SignInDto): Promise<signInData> {
    return this.authService.signinLocal(dto);
  }

  @SkipThrottle({ default: true })
  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @SkipThrottle({ default: true })
  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @SkipThrottle({ default: true })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('send-activation-code')
  sendActivationCode(@Body() dto: SendActivationCodeDto) {
    return this.authService.sendActivationCode(dto);
  }

  @SkipThrottle({ default: true })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Put('activate-account')
  activateAccount(@Body() dto: ActivateAccountDto): Promise<boolean> {
    return this.authService.activateAccount(dto);
  }

  @SkipThrottle({ default: true })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('email-check')
  checkEmail(@Body() dto: EmailCheckDto): Promise<boolean> {
    return this.authService.checkEmail(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('forget-password')
  forgetPassword(@Body() dto: EmailCheckDto): Promise<boolean> {
    return this.authService.forgetPassword(dto);
  }

  @SkipThrottle({ default: true })
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  resetPassword(@GetCurrentUserId() userId: number, @Body() dto: ResetPasswordDto): Promise<boolean> {
    return this.authService.resetPassword(userId , dto);
  }

  @SkipThrottle({ default: true })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('model')
  model(@Body() string: string): Observable<AxiosResponse<any>> {
    return this.authService.modelData(string);
  }
}
