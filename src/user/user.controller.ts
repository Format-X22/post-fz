import { Controller, Get, Post, Body, Patch, Param, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { ApiBearerAuth, ApiCreatedResponse, ApiProperty, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
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
    @ApiCreatedResponse({
        type: User,
    })
    async register(@Body() createUserDto: RegistrationArgs): Promise<Partial<User>> {
        return this.userService.register(createUserDto);
    }

    @Get()
    @ApiCreatedResponse({
        type: User,
    })
    async getMe(@Request() req: TAuth): Promise<Partial<User>> {
        return this.userService.getMe(req.user.id);
    }

    @Get(':id')
    @ApiCreatedResponse({
        type: User,
    })
    async getProfile(@Param('id') id: number): Promise<Partial<User>> {
        return this.userService.getProfile(id);
    }

    @Patch()
    @ApiCreatedResponse({
        type: User,
    })
    async updateSettings(@Request() req: TAuth, @Body() updateUserDto: SettingsArgs): Promise<Partial<User>> {
        return this.userService.updateSettings(req.user.id, updateUserDto);
    }
}
