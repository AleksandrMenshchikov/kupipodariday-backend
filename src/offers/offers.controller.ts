import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOffersDto } from './dto/create-offers.dto';
import { User } from '../custom-decorators';
import { IUserPayload } from '../types';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(@Body() createOffersDto: CreateOffersDto, @User() user: IUserPayload) {
    return this.offersService.create(createOffersDto, user.id);
  }

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.offersService.findOneById(id);
  }
}
