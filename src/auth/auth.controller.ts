import { Controller, Post, UseGuards, Request, Query } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from './guards/public.guard';
import { User } from '../user/user.model';
import { ApiTags } from '@nestjs/swagger';

export type TAuth = { user: User };

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('signIn')
    async signIn(@Query('username') username: string, @Query('password') password: string, @Request() req: TAuth) {
        return this.authService.login(req.user);
    }
}
