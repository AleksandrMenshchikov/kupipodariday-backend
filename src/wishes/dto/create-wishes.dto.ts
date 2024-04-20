import { PickType } from '@nestjs/mapped-types';
import { Wish } from '../entities/wish.entity';

export class CreateWishesDto extends PickType(Wish, [
  'name',
  'link',
  'image',
  'price',
  'description',
]) {}
