import { Controller, Get, Post, Body, Patch, Param, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { ApiBearerAuth, ApiProperty, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';
import { Public } from '../auth/guards/public.guard';
import { TAuth } from '../auth/auth.controller';

export class RegistrationArgs {
    @ApiProperty()
    @MinLength(3)
    @MaxLength(128)
    login: string;

    @ApiProperty()
    @MinLength(8)
    @MaxLength(128)
    password: string;
}

export class SettingsArgs {
    @ApiPropertyOptional()
    @MinLength(1)
    @MaxLength(128)
    firstName?: string;

    @ApiPropertyOptional()
    @MinLength(1)
    @MaxLength(128)
    lastName?: string;

    @ApiPropertyOptional()
    @MinLength(1)
    @MaxLength(2048)
    bio?: string;
}

@ApiTags('api')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Public()
    @Post()
    async register(@Body() createUserDto: RegistrationArgs): Promise<Partial<User>> {
        return this.userService.register(createUserDto);
    }

    @Get()
    async getMe(@Request() req: TAuth): Promise<Partial<User>> {
        return this.userService.getMe(req.user.id);
    }

    @Get(':id')
    async getProfile(@Param('id') id: number): Promise<Partial<User>> {
        return this.userService.getProfile(id);
    }

    @Patch()
    async updateSettings(@Request() req: TAuth, @Body() updateUserDto: SettingsArgs): Promise<Partial<User>> {
        return this.userService.updateSettings(req.user.id, updateUserDto);
    }
}
