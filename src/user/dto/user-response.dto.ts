import { ApiProperty } from '@nestjs/swagger';

import { ProductDto } from './product.dto';

export class UserResponseDto {
  @ApiProperty({
    description: 'The ID of the user',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john@doe.com',
    type: String,
    format: 'email',
  })
  email: string;

  @ApiProperty({
    description: 'The date when the user was created',
    example: '2023-10-01T12:00:00Z',
    type: String,
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the user was last updated',
    example: '2023-10-01T12:00:00Z',
    type: String,
    format: 'date-time',
  })
  updatedAt: Date;

  favorites?: ProductDto[];
}
