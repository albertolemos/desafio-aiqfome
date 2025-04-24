import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly repository: UserRepository) {}

  async create(data: CreateUserDto): Promise<User | null> {
    this.logger.log(`Creating user with data: ${JSON.stringify(data)}`);

    const { email } = data;
    const user = await this.findByEmail(email);
    if (user) {
      this.logger.error(`User with email ${email} already exists`);
      throw new ConflictException(`User with this email already exists`);
    }

    const newUser = await this.repository.create(data);

    this.logger.log(
      `User created successfully. New user: ${JSON.stringify(newUser)}`,
    );

    return newUser;
  }

  async findAll(): Promise<User[]> {
    this.logger.log('Fetching all users');

    const allUsers = await this.repository.findAll();
    if (!allUsers.length) {
      this.logger.error('Users not found');
      throw new NotFoundException('Users not found');
    }

    this.logger.log(
      `Fetched ${allUsers.length} users: ${JSON.stringify(allUsers)}`,
    );

    return allUsers;
  }

  async findById(id: number): Promise<User | null> {
    this.logger.log(`Fetching user with id ${id}`);

    this.validateId(id);

    const user = await this.repository.findById(id);
    if (!user) {
      this.logger.error(`User with id ${id} not found`);
      throw new NotFoundException('User not found');
    }

    this.logger.log(`User with id ${id} found: ${JSON.stringify(user)}`);

    return user;
  }

  private validateId(id: number): void {
    const isInvalidId = !Number.isInteger(id) || id < 1;
    if (isInvalidId) {
      this.logger.error(`User id is invalid`);
      throw new ConflictException('User id is invalid');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    this.logger.log(`Fetching user with email ${email}`);
    return this.repository.findByEmail(email);
  }

  async update(id: number, data: UpdateUserDto): Promise<void> {
    await this.findById(id);
    const user = await this.findByEmail(data.email);

    if (user && user?.id !== id) {
      this.logger.error(`User with email ${data.email} already exists`);
      throw new ConflictException(`User with this email already exists`);
    }
    this.logger.log(
      `Updating user with id ${id}. Data to update: ${JSON.stringify({ id, data })}`,
    );

    await this.repository.update(id, data);

    this.logger.log(`User updated successfully`);
  }

  async delete(id: number): Promise<void> {
    this.logger.log(`Deleting user with id ${id}`);

    await this.findById(id);
    await this.repository.delete(id);

    this.logger.log(`User deleted successfully`);
  }
}
