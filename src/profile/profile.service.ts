import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { CreateProfile } from './create-profile.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @Inject(UsersService) private userService: UsersService,
  ) {}
  async getProfile(id: number): Promise<any> {
    return { message: 'Hello World' + id };
  }
  async getAllProfiles(): Promise<any[]> {
    return await this.profileRepository.find();
  }
  async createProfile(
    userId: number,
    profile: CreateProfile,
  ): Promise<CreateProfile> {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const newProfile = this.profileRepository.create(profile);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    const savedUser = await this.userService.updateUserById(userId, user);
    return savedProfile;
  }
  async doesProfileExists(id: number): Promise<boolean> {
    const result = await this.profileRepository.findOne({ where: { id } });
    if (result) {
      return true;
    }
    return false;
  }
}
