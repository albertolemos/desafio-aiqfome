import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { User } from '@prisma/client';
import { AxiosResponse } from 'axios';

import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { ProductDto } from '../dto/product.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { AuthService } from '../../auth/auth.service';
import { UserResponseMapper } from '../mapper/user-response.mapper';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private readonly URL = 'https://fakestoreapi.com/products';

  constructor(
    private readonly repository: UserRepository,
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
  ) {}

  async create(data: CreateUserDto): Promise<UserResponseDto | null> {
    this.logger.log(`Creating user with data: ${JSON.stringify(data)}`);

    const { email, password } = data;
    const user: User = await this.findByEmail(email);
    if (user) {
      this.logger.error(`User with email ${email} already exists`);
      throw new ConflictException(`User with this email already exists`);
    }

    const hashedPassword = await this.authService.hashPassword(password);
    const newUser: User = await this.repository.create({
      ...data,
      password: hashedPassword,
    });

    this.logger.log(
      `User created successfully. New user: ${JSON.stringify(newUser)}`,
    );

    return UserResponseMapper.toResponse(newUser);
  }

  async findAll(): Promise<UserResponseDto[] | null> {
    this.logger.log('Fetching all users');

    const allUsers: User[] = await this.repository.findAll();
    if (!allUsers.length) {
      this.logger.error('Users not found');
      throw new NotFoundException('Users not found');
    }

    const products: ProductDto[] = await this.fetchProduct();

    const usersWithFavorites: UserResponseDto[] = allUsers.map((user) => {
      const favorites = this.filteredFavoritesProducts(
        products,
        user.favorites,
      );
      return UserResponseMapper.toResponse(user, favorites);
    });

    this.logger.log(
      `Users with favorites found: ${JSON.stringify(usersWithFavorites)}`,
    );

    return usersWithFavorites;
  }

  async findById(id: number): Promise<UserResponseDto | null> {
    this.logger.log(`Fetching user with id ${id}`);

    this.validateId(id);

    const user = await this.repository.findById(id);
    if (!user) {
      this.logger.error(`User with id ${id} not found`);
      throw new NotFoundException('User not found');
    }

    const products: ProductDto[] = await this.fetchProduct();
    const favorites = this.filteredFavoritesProducts(products, user.favorites);
    const userWithFavorites: UserResponseDto = UserResponseMapper.toResponse(
      user,
      favorites,
    );

    this.logger.log(
      `User with id ${id} found: ${JSON.stringify(userWithFavorites)}`,
    );

    return userWithFavorites;
  }

  private validateId(id: number): void {
    const isInvalidId = !Number.isInteger(id) || id < 1;
    if (isInvalidId) {
      this.logger.error(`User id is invalid`);
      throw new ConflictException('User id is invalid');
    }
  }

  private async findByEmail(email: string): Promise<User | null> {
    this.logger.log(`Fetching user with email ${email}`);
    return this.repository.findByEmail(email);
  }

  async update(id: number, data: Partial<CreateUserDto>): Promise<void> {
    await this.findById(id);
    const { id: userId } = await this.findByEmail(data.email);

    if (userId !== id) {
      this.logger.error(`User with email ${data.email} already exists`);
      throw new ConflictException(`User with this email already exists`);
    }

    if (data.password) {
      const hashedPassword = await this.authService.hashPassword(data.password);
      data.password = hashedPassword;
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

  private async fetchProduct(id?: number): Promise<Array<ProductDto>> {
    try {
      const { data }: AxiosResponse<Array<ProductDto>> =
        await this.httpService.axiosRef.get(`${this.URL}/${id || ''}`);

      if (!data) {
        this.logger.error(`Product with id ${id} not found`);
        throw new NotFoundException('Product not found');
      }

      this.logger.log(`Product with id ${id} found: ${JSON.stringify(data)}`);
      return data;
    } catch (error: any) {
      this.logger.error(`Error fetching product: ${error}`);
      throw new NotFoundException('Error fetching product');
    }
  }

  private filteredFavoritesProducts(
    products: ProductDto[],
    favoritesIds: number[],
  ): Array<ProductDto> {
    return products.filter(({ id }) => favoritesIds.includes(id));
  }
}
