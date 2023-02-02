import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { newUserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
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
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }
  @Delete(':id')
  deleteUserById(@Param('id') id: number) {
    return this.userService.deleteUserById(id);
  }
  @Patch(':id')
  updateUserById(@Param('id') id: number, @Body() user: UpdateUserDto) {
    return this.userService.updateUserById(id, user);
  }
}
