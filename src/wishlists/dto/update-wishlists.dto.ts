import { CreateWishlistDto } from './create-wishlists.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateWishlistDto extends PartialType(CreateWishlistDto) {}
