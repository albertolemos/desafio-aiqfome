/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '@prisma/client';

import { UserRepository } from '../user/repository/user.repository';
import { LoginDto } from './dto/auth.dto';
import { AuthResponse } from './interface/auth-response.interface';
import { JwtPayload } from './interface/jwt.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto): Promise<AuthResponse> {
    this.logger.log(`Logging in user with email: ${data.email}`);

    const user: User | null = await this.userRepository.findByEmail(data.email);
    if (!user) {
      this.logger.error(
        `User with email ${data.email} not found. Invalid credentials`,
      );
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      data.password,
      user.password as string,
    );
    if (!isPasswordValid) {
      this.logger.error(
        `Invalid password for user with email ${data.email}. Invalid credentials`,
      );
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async hashPassword(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
