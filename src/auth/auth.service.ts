import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findOne(username);

    if (!user) {
      return null;
    }
    const { password, ...rest } = user;
    const matchedPassword = await bcrypt.compare(pass, password);

    if (!matchedPassword) {
      return null;
    }

    return rest;
  }

  signin(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
