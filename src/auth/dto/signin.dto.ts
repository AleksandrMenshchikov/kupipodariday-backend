import { PickType } from '@nestjs/mapped-types';
import { User } from '../../users/entities/user.entity';

export class SigninDto extends PickType(User, ['username', 'password']) {}
