import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { newUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createUser(user: newUserDto): Promise<newUserDto> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }
  async getAllUsers(): Promise<newUserDto[]> {
    const result = await this.userRepository.find();
    return result;
  }
}
