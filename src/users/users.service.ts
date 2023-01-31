import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { DeleteResult, Repository } from 'typeorm';
import { newUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  /**
   * It creates a new user and saves it to the database
   * @param {newUserDto} user - newUserDto - this is the parameter that we are passing into the
   * function.
   * @returns The newUserDto object is being returned.
   */
  async createUser(user: newUserDto): Promise<newUserDto> {
    if (await this.userExists(user.username)) {
      throw new HttpException(
        'User with this username already exists',
        HttpStatus.CONFLICT,
      );
    }
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
  /**
   * This function returns a promise of an array of newUserDto objects
   * @returns An array of newUserDto objects
   */
  async getAllUsers(): Promise<newUserDto[]> {
    const result = this.userRepository.find();
    return result;
  }
  /**
   * This function takes in a number, and returns a promise that resolves to a newUserDto
   * @param {number} id - number - The id of the user we want to get.
   * @returns A promise of a newUserDto
   */
  async getUserById(id: number): Promise<newUserDto> {
    const result = await this.userRepository.findOne({ where: { id } });
    if (!result) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
  /**
   * It deletes a user by id
   * @param {number} id - number - The id of the user to delete.
   * @returns DeleteResult
   */
  async deleteUserById(id: number): Promise<DeleteResult> {
    const result = await this.userRepository.delete({ id });
    if (result.affected === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
  /**
   * It takes an id and a user object, and updates the user with the given id with the given user
   * object
   * @param {number} id - number - The id of the user to update
   * @param {UpdateUserDto} user - UpdateUserDto - This is the DTO that we created earlier.
   * @returns The result of the update operation.
   */
  async updateUserById(id: number, user: UpdateUserDto): Promise<unknown> {
    const userUpdate = { ...user, updatedAT: new Date() };
    const result = await this.userRepository.update({ id }, userUpdate);
    if (result.affected === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
  /**
   * It returns true if a user with the given username exists, and false otherwise
   * @param {string} username - string - The username of the user we want to check if exists.
   * @returns A boolean value.
   */
  async userExists(username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { username } });
    return Boolean(user);
  }
}
