import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlists.dto';
import { User } from '../custom-decorators';
import { IUserPayload } from '../types';
import { UpdateWishlistDto } from './dto/update-wishlists.dto';

@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }

  @Post()
  create(
    @Body() createWishlistDto: CreateWishlistDto,
    @User() user: IUserPayload,
  ) {
    return this.wishlistsService.create(createWishlistDto, user);
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.wishlistsService.findOneById(id);
  }

  @Patch(':id')
  update(
    @Body() updateWishlistDto: UpdateWishlistDto,
    @Param('id') id: number,
  ) {
    return this.wishlistsService.update(updateWishlistDto, id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.wishlistsService.delete(id);
  }
}
