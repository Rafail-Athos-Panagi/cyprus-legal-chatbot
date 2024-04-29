import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy} from './strategies';
import { CacheModule } from '@nestjs/cache-manager';

import { MailerModule } from '@nestjs-modules/mailer';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    JwtModule.register({}),
    CacheModule.register({
      max: 100,
      ttl: 20,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy , RtStrategy],
})
export class AuthModule {}
