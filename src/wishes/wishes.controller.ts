import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishesDto } from './dto/create-wishes.dto';
import { IUserPayload } from '../shared/types';
import { Public, User } from '../shared/custom-decorators';
import { UpdateWishesDto } from './dto/update-wishes.dto';
import { Wish } from './entities/wish.entity';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  create(
    @Body() createWishesDto: CreateWishesDto,
    @User() user: IUserPayload,
  ): Promise<
    {
      ownerId: number;
      name: string;
      link: string;
      image: string;
      price: number;
      description: string;
    } & Wish
  > {
    return this.wishesService.create(createWishesDto, user.id);
  }

  @Post(':id/copy')
  createCopy(
    @Param('id') id: number,
    @User() userId: IUserPayload,
  ): Promise<Wish | null> {
    return this.wishesService.createCopy(id, userId);
  }

  @Public()
  @Get('last')
  findUserLast(): Promise<Wish[]> {
    return this.wishesService.findUserLast();
  }

  @Public()
  @Get('top')
  findUserTop(): Promise<Wish[]> {
    return this.wishesService.findUserTop();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Wish> {
    return this.wishesService.findById(id);
  }

  @Patch(':id')
  update(
    @User() userId: IUserPayload,
    @Param('id') id: number,
    @Body() updateWishesDto: UpdateWishesDto,
  ): Promise<Wish | null> {
    return this.wishesService.update(userId, id, updateWishesDto);
  }

  @Delete(':id')
  delete(@User() userId: IUserPayload, @Param('id') id: number): Promise<Wish> {
    return this.wishesService.delete(userId, id);
  }
}
