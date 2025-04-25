import { ApiProperty } from '@nestjs/swagger';

export class RatingDto {
  @ApiProperty({
    description: 'The rate of the product',
    example: 3.9,
    type: Number,
  })
  rate: number;

  @ApiProperty({
    description: 'Quantity of reviews of the product',
    example: 120,
    type: Number,
  })
  count: number;
}
