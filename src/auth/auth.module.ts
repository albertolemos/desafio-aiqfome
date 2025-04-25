/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../user/repository/user.repository';
import { PrismaService } from '../../prisma/prisma.service';

const configService: ConfigService = new ConfigService();
const jwtSecret: string = configService.get<string>('JWT_SECRET');
const jwtExpiresIn: string = configService.get<string>('JWT_EXPIRES_IN', '1d');

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: jwtExpiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
