import { Controller, Post, Body } from '@nestjs/common';
import { SignupService } from './signup.service';
import { CreateSignupDto } from './dto/create-signup.dto';
import { Public } from '../custom-decorators';

@Public()
@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  create(@Body() createSignupDto: CreateSignupDto) {
    return this.signupService.create(createSignupDto);
  }
}
