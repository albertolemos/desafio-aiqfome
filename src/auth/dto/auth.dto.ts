import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'john@doe.com',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
