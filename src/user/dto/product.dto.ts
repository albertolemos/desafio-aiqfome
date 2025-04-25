import { ApiProperty } from '@nestjs/swagger';

import { RatingDto } from './rating.dto';

export class ProductDto {
  @ApiProperty({
    description: 'The ID of the product',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'The title of product',
    example: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    type: String,
  })
  title: string;

  @ApiProperty({
    description: 'The description of product',
    example:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    type: String,
  })
  description: string;

  @ApiProperty({
    description: 'The category of product',
    example: "men's clothing",
    type: String,
  })
  category: string;

  @ApiProperty({
    description: 'Url of image of product',
    example: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    type: String,
  })
  image: string;

  @ApiProperty({
    description: 'The price of product',
    example: 109.95,
    type: Number,
  })
  price: number;

  @ApiProperty({
    description: 'The review of product',
    example: 'This is a great product',
    type: String,
  })
  rating?: RatingDto;
}
