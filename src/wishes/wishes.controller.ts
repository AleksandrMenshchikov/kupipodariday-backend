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
import { IUserPayload } from '../types';
import { User } from '../custom-decorators';
import { UpdateWishesDto } from './dto/update-wishes.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  create(@Body() createWishesDto: CreateWishesDto, @User() user: IUserPayload) {
    return this.wishesService.create(createWishesDto, user.id);
  }

  @Post(':id/copy')
  createCopy(@Param('id') id: number, @User() userId: IUserPayload) {
    return this.wishesService.createCopy(id, userId);
  }

  @Get('last')
  findUserLast() {
    return this.wishesService.findUserLast();
  }

  @Get('top')
  findUserTop() {
    return this.wishesService.findUserTop();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.wishesService.findById(id);
  }

  @Patch(':id')
  update(
    @User() userId: IUserPayload,
    @Param('id') id: number,
    @Body() updateWishesDto: UpdateWishesDto,
  ) {
    return this.wishesService.update(userId, id, updateWishesDto);
  }

  @Delete(':id')
  delete(@User() userId: IUserPayload, @Param('id') id: number) {
    return this.wishesService.delete(userId, id);
  }
}
