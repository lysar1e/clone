import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    createUser(createUserDto: CreateUserDto): Promise<{
        success: boolean;
    }>;
    loginUser(loginUserDto: LoginUserDto): Promise<{
        token: string;
        userId: number;
        isAdmin: boolean;
    }>;
}
