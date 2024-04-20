import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { CreateOffersDto } from './dto/create-offers.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  create(createOffersDto: CreateOffersDto, userId: number) {
    return this.offerRepository.save({ ...createOffersDto, userId });
  }

  findAll() {
    return this.offerRepository.find({
      relations: {
        user: { wishes: { owner: true, offers: true } },
        item: { owner: true, offers: true },
      },
    });
  }

  async findOneById(id: number) {
    const data = await this.offerRepository.findOne({
      where: { id },
      relations: {
        user: { wishes: { owner: true, offers: true } },
        item: { owner: true, offers: true },
      },
    });

    if (!data) {
      throw new NotFoundException();
    }

    return data;
  }
}
