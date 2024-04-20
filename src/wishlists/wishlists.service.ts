import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlists.dto';
import { IUserPayload } from '../types';
import { UpdateWishlistDto } from './dto/update-wishlists.dto';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  findAll() {
    return this.wishlistRepository.find({
      relations: { owner: true, items: true },
    });
  }

  async create(createWishlistDto: CreateWishlistDto, user: IUserPayload) {
    const data = await this.wishlistRepository.save({
      ...createWishlistDto,
      ownerId: user.id,
    });

    return this.wishlistRepository.findOne({
      where: { id: data.id },
      relations: { owner: true, items: true },
    });
  }

  async findOneById(id: number) {
    const data = await this.wishlistRepository.findOne({
      where: { id: id },
      relations: { owner: true, items: true },
    });

    if (!data) {
      throw new NotFoundException();
    }

    return data;
  }

  async update(updateWishlistDto: UpdateWishlistDto, id: number) {
    await this.wishlistRepository.update(id, updateWishlistDto);

    return this.wishlistRepository.findOne({
      where: { id },
      relations: { owner: true, items: true },
    });
  }

  async delete(id: number) {
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
