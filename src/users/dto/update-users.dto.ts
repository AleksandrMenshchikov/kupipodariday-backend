import { PartialType, PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class UpdateUsersDto extends PickType(PartialType(User), [
  'username',
  'about',
  'avatar',
  'email',
  'password',
]) {}
