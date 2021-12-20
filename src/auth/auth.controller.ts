import { Controller, Post, UseGuards, Request, Query } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from './guards/public.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('signIn')
    async signIn(@Query('username') username: string, @Query('password') password: string, @Request() req) {
        return this.authService.login(req.user);
    }
}
