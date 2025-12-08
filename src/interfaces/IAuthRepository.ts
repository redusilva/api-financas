import { CreateUserDTO } from "../types/CreateUserDTO";
import { UserDTO } from "../types/UserDTO";

export interface IAuthRepository {
    createUser(data: CreateUserDTO): Promise<UserDTO>;
    findUserByEmail(email: string): Promise<UserDTO | null>;
}