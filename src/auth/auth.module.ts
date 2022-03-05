import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaService } from 'src/prisma.service';
import { GqlAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  providers: [
    AuthService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
