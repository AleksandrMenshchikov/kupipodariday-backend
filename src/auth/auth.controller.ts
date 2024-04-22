import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUsersDto } from '../users/dto/create-users.dto';
import { UsersService } from '../users/users.service';
import { Public } from '../shared/custom-decorators';
import { SigninDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from '../users/entities/user.entity';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  create(
    @Body() createUsersDto: CreateUsersDto,
  ): Promise<Omit<CreateUsersDto & User, 'password'>> {
    return this.usersService.create(createUsersDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signin(@Body() signinDto: SigninDto): Promise<{ access_token: string }> {
    return this.authService.signin(signinDto);
  }
}
