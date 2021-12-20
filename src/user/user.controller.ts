import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class RegistrationArgs {
    @ApiProperty()
    @MinLength(3)
    login: string;

    @ApiProperty()
    @MinLength(8)
    password: string;
}

export class SettingsArgs {}

@ApiTags('api')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async register(@Body() createUserDto: RegistrationArgs): Promise<Partial<User>> {
        return this.userService.register(createUserDto);
    }

    @Get()
    async getMe(): Promise<Partial<User>> {
        return this.userService.getMe();
    }

    @Get(':id')
    async getProfile(@Param('id') id: number): Promise<Partial<User>> {
        return this.userService.getProfile(id);
    }

    @Patch()
    async updateSettings(@Body() updateUserDto: SettingsArgs): Promise<Partial<User>> {
        return this.userService.updateSettings(updateUserDto);
    }
}
