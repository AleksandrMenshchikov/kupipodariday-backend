import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUsersDto } from './dto/update-users.dto';
import { IQuery } from '../shared/types';
import { bcryptHash } from '../shared/bcrypt';
import { CreateUsersDto } from './dto/create-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUsersDto: CreateUsersDto) {
    const { password } = createUsersDto;
    createUsersDto.password = await bcryptHash(password);
    const data = await this.userRepository.save(createUsersDto);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...rest } = data;
    return rest;
  }

  findOne(username: string) {
    return this.userRepository.findOne({
      where: { username },
      select: { password: true, username: true, id: true },
    });
  }

  async findOneByUsername(username: string) {
    const data = await this.userRepository.findOne({
      where: { username },
      select: {
        id: true,
        username: true,
        about: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!data) {
      throw new NotFoundException();
    }

    return data;
  }

  async findOneById(id: number) {
    const data = await this.userRepository.findOne({ where: { id } });

    if (!data) return null;

    return data;
  }

  async findUsernameWishes(username: string) {
    const data = await this.userRepository.findOne({
      relations: { wishes: true },
      where: {
        username,
      },
    });

    if (!data) {
      throw new NotFoundException();
    }

    return data.wishes;
  }

  async findUserWishes(userId: number) {
    const data = await this.userRepository.find({
      relations: { wishes: { owner: true } },
      where: {
        id: userId,
      },
    });

    return data[0].wishes;
  }

  async updateUser(userId: number, updateUsersDto: UpdateUsersDto) {
    const { password } = updateUsersDto;

    let pass: string;

    if (password) {
      pass = await bcryptHash(password);
      updateUsersDto.password = pass;
    }

    await this.userRepository.update(userId, updateUsersDto);

    return this.findOneById(userId);
  }

  async findOneByQuery({ query }: IQuery) {
    let data = await this.userRepository.findOne({
      where: { username: query },
    });

    if (!data) {
      data = await this.userRepository.findOne({ where: { email: query } });

      if (!data) throw new NotFoundException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = data;
    return [rest];
  }
}
