import { Injectable } from '@nestjs/common';
import { CreateSignupDto } from './dto/create-signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { bcryptHash } from '../shared/bcrypt';

@Injectable()
export class SignupService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createSignupDto: CreateSignupDto) {
    const { password } = createSignupDto;
    createSignupDto.password = await bcryptHash(password);
    const data = await this.userRepository.save(createSignupDto);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...rest } = data;
    return rest;
  }
}
