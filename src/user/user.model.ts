import { Column, Model, Table, Unique } from 'sequelize-typescript';
import { STRING, TEXT } from 'sequelize';

@Table
export class User extends Model {
    @Unique
    @Column(STRING(128))
    login: string;

    @Column(STRING(256))
    passwordHash: string;

    @Column(STRING(128))
    firstName: string;

    @Column(STRING(128))
    lastName: string;

    @Column(TEXT)
    bio: string;
}
