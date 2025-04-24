import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Patch,
} from '@nestjs/common';

import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'User created successfully',
    type: CreateUserDto,
  })
  @ApiConflictResponse({
    description: 'User with this email already exists',
  })
  /**
   * Create a new user
   * @param data - User data
   * @returns Created user data
   */
  async create(@Body() data: CreateUserDto): Promise<CreateUserDto> {
    return this.service.create(data);
  }

  @ApiFoundResponse({
    description: 'User found successfully',
    type: [CreateUserDto],
  })
  @ApiNotFoundResponse({
    description: 'Users not found',
  })
  /**
   * Get all users
   * @returns Array of user data
   */
  @Get()
  async findAll(): Promise<Array<CreateUserDto>> {
    return this.service.findAll();
  }

  @ApiFoundResponse({
    description: 'User found successfully',
    type: CreateUserDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  /**
   * Get user by ID
   * @param id - User ID
   * @returns User data
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CreateUserDto> {
    return this.service.findById(+id);
  }

  @ApiFoundResponse({
    description: 'User found successfully',
    type: CreateUserDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  /**
   * Get user by id
   * @param id - User id
   * @returns User data
   */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<void> {
    return this.service.update(+id, data);
  }

  @ApiFoundResponse({
    description: 'User found successfully',
    type: CreateUserDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  /**
   * Delete user by id
   * @param id - User id
   * @returns void
   */
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(+id);
  }
}
