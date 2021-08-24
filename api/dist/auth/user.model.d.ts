import { Model } from "sequelize-typescript";
interface UserCreationAttributes {
    email: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttributes> {
    id: number;
    email: string;
    password: string;
    isAdmin: boolean;
}
export {};
