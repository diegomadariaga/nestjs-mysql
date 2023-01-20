import { Body, Controller, Get, Post } from '@nestjs/common';
import { newUserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post()
  createUser(@Body() user: newUserDto) {
    return this.userService.createUser(user);
  }
  @Get()
  getUsers() {
    return this.userService.getAllUsers();
  }
}
