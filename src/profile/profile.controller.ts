import { Controller, Get, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfile } from './create-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Get()
  async getAllProfiles(): Promise<any> {
    return await this.profileService.getAllProfiles();
  }
  @Post('user/:id')
  async createProfile(): Promise<CreateProfile> {
    return await this.profileService.createProfile(1, {
      firstName: 'John',
      lastName: 'Doe',
      email: 'asd@gmail.com',
    });
  }
}
