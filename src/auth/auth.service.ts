import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserPayload } from '../types';
import { bcryptCompare } from '../shared/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException(
        `Key (username)=(${username}) does not exist.`,
      );
    }
    const { password, ...rest } = user;
    const matchedPassword = await bcryptCompare(pass, password);

    if (!matchedPassword) {
      throw new UnauthorizedException(
        `Key (password)=(${pass}) does not exist.`,
      );
    }

    return rest;
  }

  signin(id: number) {
    const payload: IUserPayload = { id };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
