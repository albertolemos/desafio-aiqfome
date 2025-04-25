import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';

@Injectable()
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @ApiCreatedResponse({
    description: 'User created successfully',
    type: UserResponseDto,
  })
  @ApiConflictResponse({
    description: 'User with this email already exists',
  })
  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.service.create(data);
  }

  @ApiFoundResponse({
    description: 'User found successfully',
    type: [UserResponseDto],
  })
  @ApiNotFoundResponse({
    description: 'Users not found',
  })
  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @ApiFoundResponse({
    description: 'User found successfully',
    type: UserResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findById(+id);
  }

  @ApiFoundResponse({
    description: 'User found successfully',
    type: UserResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: CreateUserDto) {
    return this.service.update(+id, data);
  }

  @ApiFoundResponse({
    description: 'User found successfully',
    type: UserResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
