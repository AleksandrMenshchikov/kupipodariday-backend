import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';
import { CreateWishesDto } from './dto/create-wishes.dto';
import { UpdateWishesDto } from './dto/update-wishes.dto';
import { IUserPayload } from '../types';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) readonly wishRepository: Repository<Wish>,
  ) {}

  create(createWishesDto: CreateWishesDto, userId: number) {
    return this.wishRepository.save({
      ...createWishesDto,
      ownerId: userId,
    });
  }

  findUserLast() {
    return this.wishRepository.find({
      order: { id: 'DESC' },
      take: 1,
      relations: { owner: true },
    });
  }

  findUserTop() {
    return this.wishRepository.find({
      order: { copied: 'DESC' },
      take: 10,
      relations: { owner: true },
    });
  }

  async findById(id: number) {
    const data = await this.wishRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!data) {
      throw new NotFoundException();
    }

    return data;
  }

  async update(
    userId: IUserPayload,
    id: number,
    updateWishesDto: UpdateWishesDto,
  ) {
    const found1 = await this.wishRepository.findOne({
      where: { id },
    });

    if (!found1) {
      throw new NotFoundException();
    }

    const found2 = await this.wishRepository.findOne({
      where: { id, ownerId: userId.id },
    });

    if (!found2) {
      throw new ForbiddenException();
    }

    await this.wishRepository.update(id, updateWishesDto);

    return await this.wishRepository.findOne({
      where: { id, ownerId: userId.id },
      relations: { owner: true },
    });
  }

  async delete(userId: IUserPayload, id: number) {
    const found1 = await this.wishRepository.findOne({
      where: { id },
      relations: { owner: true },
    });

    if (!found1) {
      throw new NotFoundException();
    }

    const found2 = await this.wishRepository.findOne({
      where: { id, ownerId: userId.id },
    });

    if (!found2) {
      throw new ForbiddenException();
    }

    await this.wishRepository.delete(id);

    return found1;
  }

  async createCopy(id: number, userId: IUserPayload) {
    const found1 = await this.wishRepository.findOne({
      where: { id },
    });

    if (!found1) {
      throw new NotFoundException();
    }

    await this.wishRepository.update(id, { copied: ++found1.copied });

    found1.ownerId = userId.id;
    found1.copied = 0;

    await this.wishRepository.insert(found1);

    return await this.wishRepository.findOne({
      where: { id },
      relations: { owner: true },
    });
  }
}
