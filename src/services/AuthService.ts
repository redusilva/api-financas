import { IAuthRepository } from "../interfaces/IAuthRepository";
import { IAuthService } from "../interfaces/IAuthService";
import { CreateUserDTO } from "../types/CreateUserDTO";
import { UserDTO } from "../types/UserDTO";
import bcrypt from 'bcrypt';

type Props = {
    authRepository: IAuthRepository;
}

export class AuthService implements IAuthService {
    private authRepository: IAuthRepository;

    constructor(props: Props) {
        this.authRepository = props.authRepository;
    }

    async createUser(data: CreateUserDTO): Promise<UserDTO> {
        const originalPassword = data.password;
        const saltRounds = process.env.BCRYPT_SALT_ROUNDS as string;

        const hashedPassword = await bcrypt.hash(originalPassword, parseInt(saltRounds));

        data.password = hashedPassword;

        return this.authRepository.createUser(data);
    }
}