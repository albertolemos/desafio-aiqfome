import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserRepository } from './repository/user.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
})
export class UserModule {}
