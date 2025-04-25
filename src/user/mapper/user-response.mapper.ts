import { User } from '@prisma/client';
import { ProductDto } from '../dto/product.dto';
import { UserResponseDto } from '../dto/user-response.dto';

export class UserResponseMapper {
  static toResponse(user: User, favorites?: ProductDto[]): UserResponseDto {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      favorites: favorites || [],
    };
  }
}
