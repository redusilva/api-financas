import { CreateUserDTO } from "../types/CreateUserDTO";
import { UserDTO } from "../types/UserDTO";

export interface IUserRepository {
    createUser(data: CreateUserDTO): Promise<UserDTO>;
    findUserByEmail(email: string): Promise<UserDTO | null>;
    updateUser(user: UserDTO): Promise<UserDTO>;
    findByid(id: number): Promise<UserDTO | null>;
}