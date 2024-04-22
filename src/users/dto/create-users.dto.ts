import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class CreateUsersDto extends PickType(User, [
  'username',
  'about',
  'avatar',
  'email',
  'password',
]) {}
