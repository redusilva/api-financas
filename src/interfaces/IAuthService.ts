import { CreateUserDTO } from "../types/CreateUserDTO";
import { UserDTO } from "../types/UserDTO";

export interface IAuthService {
    createUser(data: CreateUserDTO): Promise<UserDTO>;
}