import { PickType } from '@nestjs/mapped-types';
import { Wishlist } from '../entities/wishlist.entity';

export class CreateWishlistDto extends PickType(Wishlist, [
  'name',
  'image',
  'items',
]) {}
