import { Column, Model, Table, Unique } from 'sequelize-typescript';
import { STRING, TEXT } from 'sequelize';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class User extends Model {
    @ApiProperty()
    @Unique
    @Column(STRING(128))
    login: string;

    @Column(STRING(256))
    passwordHash: string;

    @ApiProperty()
    @Column(STRING(128))
    firstName: string;

    @ApiProperty()
    @Column(STRING(128))
    lastName: string;

    @ApiProperty()
    @Column(TEXT)
    bio: string;
}
