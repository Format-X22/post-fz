import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { RegistrationArgs, SettingsArgs } from './user.controller';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
    async register({ login, password }: RegistrationArgs): Promise<Partial<User>> {
        const passwordHash = await bcrypt.hash(password, 10);

        return this.removeSecurityFields(
            await User.create({
                login,
                passwordHash,
            }),
        );
    }

    async getMe(): Promise<Partial<User>> {
        // TODO -
        return;
    }

    async getProfile(id: number): Promise<Partial<User>> {
        const user = await User.findByPk(id);

        if (!user) {
            throw new NotFoundError('User not found');
        }

        // TODO Remove personal data

        return this.removeSecurityFields(user);
    }

    async updateSettings(args: SettingsArgs): Promise<Partial<User>> {
        // TODO -
        return;
    }

    async getByLoginAsAdmin(login: string): Promise<User> {
        return await User.findOne({ where: { login } });
    }

    private removeSecurityFields(user: User): Partial<User> {
        user = user['dataValues'];

        delete user.passwordHash;
        delete user.createdAt;
        delete user.updatedAt;

        return user;
    }
}
