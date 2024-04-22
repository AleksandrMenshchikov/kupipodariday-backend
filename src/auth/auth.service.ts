import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserPayload } from '../shared/types';
import { bcryptCompare } from '../shared/bcrypt';
import { SigninDto } from './dto/signin.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<User, 'password'>> {
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

  async signin(signinDto: SigninDto): Promise<{ access_token: string }> {
    const { username, password } = signinDto;
    const { id } = await this.validateUser(username, password);
    const payload: IUserPayload = { id };

    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
