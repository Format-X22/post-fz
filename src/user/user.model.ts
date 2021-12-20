import { Column, Model, Table, Unique } from 'sequelize-typescript';

@Table
export class User extends Model {
    @Unique
    @Column
    login: string;

    @Column
    passwordHash: string;

    @Column
    firstName: string;

    @Column
    lastName: string;
}
