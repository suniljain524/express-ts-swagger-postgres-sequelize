// src/models/User.ts
import { Table, Column, Model } from 'sequelize-typescript';
import { NullishPropertiesOf } from 'sequelize/types/utils';

@Table
export class User extends Model<User> {
    @Column
    firstName!: string;

    @Column
    lastName!: string;

    @Column
    email!: string;


    static async createUser(userData: {
        firstName: string;
        lastName: string;
        email: string;
    }): Promise<User> {
        const newUser = await this.create(userData as Omit<User, NullishPropertiesOf<User>>);
        return newUser;
    }
}