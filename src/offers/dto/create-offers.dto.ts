import { PickType } from '@nestjs/mapped-types';
import { Offer } from '../entities/offer.entity';

export class CreateOffersDto extends PickType(Offer, [
  'amount',
  'hidden',
  'itemId',
]) {}
