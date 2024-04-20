import { IntersectionType, PartialType, PickType } from '@nestjs/mapped-types';
import { CreateWishesDto } from './create-wishes.dto';
import { Wish } from '../entities/wish.entity';

export class UpdateWishesDto extends IntersectionType(
  PartialType(CreateWishesDto),
  PickType(Wish, ['ownerId']),
) {}
