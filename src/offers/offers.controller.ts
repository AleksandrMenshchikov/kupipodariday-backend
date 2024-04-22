import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOffersDto } from './dto/create-offers.dto';
import { User } from '../shared/custom-decorators';
import { IUserPayload } from '../shared/types';
import { Offer } from './entities/offer.entity';
import { Wish } from '../wishes/entities/wish.entity';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(
    @Body() createOffersDto: CreateOffersDto,
    @User() user: IUserPayload,
  ): Promise<
    {
      userId: number;
      amount: number;
      hidden: boolean;
      item: Wish;
    } & Offer
  > {
    return this.offersService.create(createOffersDto, user.id);
  }

  @Get()
  findAll(): Promise<Offer[]> {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: number): Promise<Offer> {
    return this.offersService.findOneById(id);
  }
}
