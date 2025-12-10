import { IAuthRepository } from "../interfaces/IAuthRepository";
import { IAuthService } from "../interfaces/IAuthService";
import { CreateUserDTO } from "../types/CreateUserDTO";
import { UserDTO } from "../types/UserDTO";
import bcrypt from 'bcrypt';
import { AppError } from "../errors/AppError";

type Props = {
    authRepository: IAuthRepository;
}

export class AuthService implements IAuthService {
    private authRepository: IAuthRepository;

    constructor(props: Props) {
        this.authRepository = props.authRepository;
    }

    async createUser(data: CreateUserDTO): Promise<UserDTO> {
        const currentUser = await this.authRepository.findUserByEmail(data.email);
        if (currentUser) {
            throw new AppError('User with this email already exists', 409);
        }

        const originalPassword = data.password;
        const saltEnv = process.env.BCRYPT_SALT_ROUNDS;
        const saltRounds = saltEnv ? parseInt(saltEnv, 10) : 10;

        const hashedPassword = await bcrypt.hash(originalPassword, saltRounds);

        const toCreate: CreateUserDTO = {
            ...data,
            password: hashedPassword,
        };

        const user = await this.authRepository.createUser(toCreate);

        return user;
    }
}