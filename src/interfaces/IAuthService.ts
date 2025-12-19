import { CreateUserDTO } from "../types/CreateUserDTO";
import { LoginReturnDTO } from "../types/LoginReturnDTO";
import { UserDTO } from "../types/UserDTO";

export interface IAuthService {
    createUser(data: CreateUserDTO): Promise<UserDTO>;
    login(email: string, password: string): Promise<LoginReturnDTO>;
    refreshToken(token: string): Promise<LoginReturnDTO>;
}