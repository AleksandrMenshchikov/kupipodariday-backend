import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUsersDto } from '../users/dto/create-users.dto';
import { UsersService } from '../users/users.service';
import { Public } from '../shared/custom-decorators';
import { SigninDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  create(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.create(createUsersDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }
}
