import { Body, Controller, Post } from '@nestjs/common';
import { SigninService } from './signin.service';
import { CreateSigninDto } from './dto/create-signin.dto';
import { Public } from '../custom-decorators';

@Public()
@Controller('signin')
export class SigninController {
  constructor(private readonly signinService: SigninService) {}

  @Post()
  createJwt(@Body() createSigninDto: CreateSigninDto) {
    return this.signinService.createJwt(createSigninDto);
  }
}
