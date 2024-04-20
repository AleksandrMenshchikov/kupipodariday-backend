import { Injectable } from '@nestjs/common';
import { CreateSigninDto } from './dto/create-signin.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class SigninService {
  constructor(private readonly authService: AuthService) {}

  async createJwt(createSigninDto: CreateSigninDto) {
    const { username, password } = createSigninDto;
    const { id } = await this.authService.validateUser(username, password);
    return this.authService.signin(id);
  }
}
