import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { CreateOffersDto } from './dto/create-offers.dto';
import { Wish } from '../wishes/entities/wish.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    @InjectRepository(Wish) private readonly wishRepository: Repository<Wish>,
  ) {}

  async create(
    createOffersDto: CreateOffersDto,
    userId: number,
  ): Promise<
    { userId: number; amount: number; hidden: boolean; item: Wish } & Offer
  > {
    const data = await this.wishRepository.findOne({
      where: { id: createOffersDto.itemId },
    });

    if (!data) {
      throw new NotFoundException(`${createOffersDto.itemId} does not exist.`);
    }

    if (data.ownerId === userId) {
      throw new ForbiddenException(
        'User should not be able to contribute money towards own gifts.',
      );
    }

    if (createOffersDto.amount + data.raised > data.price) {
      throw new ForbiddenException(
        'User should not be able to deposit more money than sum of price + raised.',
      );
    }

    await this.wishRepository.update(createOffersDto.itemId, {
      raised: createOffersDto.amount + data.raised,
    });

    return this.offerRepository.save({ ...createOffersDto, userId });
  }

  findAll(): Promise<Offer[]> {
    return this.offerRepository.find({
      relations: {
        user: { wishes: { owner: true, offers: true } },
        item: { owner: true, offers: true },
      },
    });
  }

  async findOneById(id: number): Promise<Offer> {
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
