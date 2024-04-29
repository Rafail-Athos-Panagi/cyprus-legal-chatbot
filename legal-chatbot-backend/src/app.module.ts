import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './common/guards';
import { PrismaModule } from './prisma/prisma.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ModelModule } from './model/model.module';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, ModelModule ,PrismaModule , ThrottlerModule.forRoot([{
    ttl: 60000,
    limit: 5,
  }])],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
