import { PickType } from '@nestjs/mapped-types';
import { User } from '../../users/entities/user.entity';

export class CreateSignupDto extends PickType(User, [
  'username',
  'about',
  'avatar',
  'email',
  'password',
]) {}
