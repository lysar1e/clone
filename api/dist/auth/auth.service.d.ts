import { User } from "./user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
export declare class AuthService {
    private userRepository;
    constructor(userRepository: typeof User);
    createUser(createUserDto: CreateUserDto): Promise<{
        success: boolean;
    }>;
    loginUser(loginUserDto: LoginUserDto): Promise<{
        token: string;
        userId: number;
        isAdmin: boolean;
    }>;
}
