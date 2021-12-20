import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { RegistrationArgs, SettingsArgs } from './user.controller';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
    removeSecurityFields(user: User): Partial<User> {
        user = user['dataValues'];

        delete user.passwordHash;
        delete user.createdAt;
        delete user.updatedAt;

        return user;
    }

    async register({ login, password }: RegistrationArgs): Promise<Partial<User>> {
        const passwordHash = await bcrypt.hash(password, 10);

        return this.removeSecurityFields(
            await User.create({
                login,
                passwordHash,
            }),
        );
    }

    async getMe(id: number): Promise<Partial<User>> {
        const user = await User.findByPk(id);

        if (!user) {
            throw new NotFoundError('User not found');
        }

        return this.removeSecurityFields(user);
    }

    async getProfile(id: number): Promise<Partial<User>> {
        const user = await this.getMe(id);

        // TODO Remove personal data

        return user;
    }

    async updateSettings(id: number, args: SettingsArgs): Promise<Partial<User>> {
        const user = await User.findByPk(id);

        if (args.firstName) {
            user.firstName = args.firstName;
        }

        if (args.lastName) {
            user.lastName = args.lastName;
        }

        if (args.bio) {
            user.bio = args.bio;
        }

        await user.save();

        return this.removeSecurityFields(user);
    }

    async getByLoginAsAdmin(login: string): Promise<User> {
        return await User.findOne({ where: { login } });
    }
}
