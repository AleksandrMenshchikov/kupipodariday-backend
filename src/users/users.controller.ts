import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUsersDto } from './dto/update-users.dto';
import { User } from '../shared/custom-decorators';
import { IQuery, IUserPayload } from '../shared/types';
import { Wish } from '../wishes/entities/wish.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async findOneById(@User() user: IUserPayload) {
    return this.usersService.findOneById(user.id);
  }

  @Get('me/wishes')
  findUserWishes(@User() user: IUserPayload): Promise<Wish[]> {
    return this.usersService.findUserWishes(user.id);
  }

  @Get(':username')
  findOneByUsername(@Param('username') username: string) {
    return this.usersService.findOneByUsername(username);
  }

  @Get(':username/wishes')
  findUsernameWishes(@Param('username') username: string): Promise<Wish[]> {
    return this.usersService.findUsernameWishes(username);
  }

  @Patch('me')
  updateUser(
    @Body() updateUsersDto: UpdateUsersDto,
    @User() user: IUserPayload,
  ) {
    return this.usersService.updateUser(user.id, updateUsersDto);
  }

  @Post('find')
  findOneByQuery(@Body() { query }: IQuery) {
    return this.usersService.findOneByQuery({ query });
  }
}
