import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.model';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.getByLoginAsAdmin(username);

        if (user && (await bcrypt.compare(password, user.passwordHash))) {
            return this.usersService.removeSecurityFields(user);
        }

        return null;
    }

    async login(user: User) {
        const payload = { username: user.login, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
