import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlists.dto';
import { IUserPayload } from '../shared/types';
import { UpdateWishlistDto } from './dto/update-wishlists.dto';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  findAll(): Promise<Wishlist[]> {
    return this.wishlistRepository.find({
      relations: { owner: true, items: true },
    });
  }

  async create(
    createWishlistDto: CreateWishlistDto,
    user: IUserPayload,
  ): Promise<Wishlist | null> {
    const data = await this.wishlistRepository.save({
      ...createWishlistDto,
      ownerId: user.id,
    });

    return this.wishlistRepository.findOne({
      where: { id: data.id },
      relations: { owner: true, items: true },
    });
  }

  async findOneById(id: number): Promise<Wishlist> {
    const data = await this.wishlistRepository.findOne({
      where: { id: id },
      relations: { owner: true, items: true },
    });

    if (!data) {
      throw new NotFoundException();
    }

    return data;
  }

  async update(
    updateWishlistDto: UpdateWishlistDto,
    id: number,
  ): Promise<Wishlist | null> {
    await this.wishlistRepository.update(id, updateWishlistDto);

    return this.wishlistRepository.findOne({
      where: { id },
      relations: { owner: true, items: true },
    });
  }

  async delete(id: number): Promise<Wishlist> {
    const data = await this.wishlistRepository.findOne({
      where: { id: id },
      relations: { owner: true, items: true },
    });

    if (!data) {
      throw new NotFoundException();
    }

    await this.wishlistRepository.delete(id);

    return data;
  }
}
