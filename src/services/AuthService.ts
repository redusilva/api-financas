import { IAuthRepository } from "../interfaces/IAuthRepository";
import { IAuthService } from "../interfaces/IAuthService";
import { CreateUserDTO } from "../types/CreateUserDTO";
import { UserDTO } from "../types/UserDTO";
import { AppError } from "../errors/AppError";
import { LoginReturnDTO } from "../types/LoginReturnDTO";
import { RefreshTokenPayloadDTO } from "../types/RefreshTokenPayloadDTO";
import { IHashProvider } from "../interfaces/IHashProvider";
import { ITokenProvider } from "../interfaces/ITokenProvider";
import { IRandomCodeService } from "../interfaces/IRandomCodeService";
import { IEmailService } from "../interfaces/IEmailService";
import { welcomeEmailTemplate } from "../utils/mailTemplates";
import { DateTime } from 'luxon';

type Props = {
    authRepository: IAuthRepository;
    hashProvider: IHashProvider;
    tokenProvider: ITokenProvider;
    randomCodeService: IRandomCodeService;
    emailService: IEmailService;
}

export class AuthService implements IAuthService {
    private authRepository: IAuthRepository;
    private hashProvider: IHashProvider;
    private tokenProvider: ITokenProvider;
    private randomCodeService: IRandomCodeService;
    private emailService: IEmailService;

    constructor(props: Props) {
        this.authRepository = props.authRepository;
        this.hashProvider = props.hashProvider;
        this.tokenProvider = props.tokenProvider;
        this.randomCodeService = props.randomCodeService;
        this.emailService = props.emailService;
    }

    async createUser(data: CreateUserDTO): Promise<UserDTO> {
        const currentUser = await this.authRepository.findUserByEmail(data.email);
        if (currentUser) {
            throw new AppError('User with this email already exists', 409);
        }

        const hashedPassword = await this.hashProvider.generateHash(data.password);

        const toCreate: CreateUserDTO = {
            ...data,
            email_verification_token: this.randomCodeService.generate(6),
            email_verification_expires_at: DateTime.now().plus({ hours: 1 }).toJSDate(),
            password: hashedPassword,
        };

        const user = await this.authRepository.createUser(toCreate);

        delete user.password;

        await this.emailService.sendEmail({
            to: user.email,
            subject: 'Bem vindo ao nosso aplicativo!',
            html: welcomeEmailTemplate(user.name, toCreate.email_verification_token!)
        });

        return user;
    }

    async login(email: string, password: string): Promise<LoginReturnDTO> {
        const currentUser = await this.authRepository.findUserByEmail(email);
        if (!currentUser) {
            throw new AppError('User with this email does not exist', 404);
        }

        const isSamePassword = await this.hashProvider.compareHash(password, currentUser.password || '');
        if (!isSamePassword) {
            throw new AppError('Unauthorized', 401);
        }

        const payload: RefreshTokenPayloadDTO = {
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
        };

        const accessToken = this.tokenProvider.generateAccessToken(payload);
        const refreshToken = this.tokenProvider.generateRefreshToken(payload);
        const refreshTokenHash = await this.hashProvider.generateHash(refreshToken)

        await this.authRepository.updateUser({
            ...currentUser,
            refresh_token_hash: refreshTokenHash
        });

        return {
            accessToken,
            refreshToken
        };
    }

    async refreshToken(token: string): Promise<LoginReturnDTO> {
        const payload = this.tokenProvider.verifyRefreshToken(token) as RefreshTokenPayloadDTO;

        const currentUser = await this.authRepository.findUserByEmail(payload.email);
        if (!currentUser) {
            throw new AppError('User not found', 404);
        }

        const isTokenValid = await this.hashProvider.compareHash(token, currentUser.refresh_token_hash || '');
        if (!isTokenValid) {
            throw new AppError('Invalid refresh token', 401);
        }

        const newPayload: RefreshTokenPayloadDTO = {
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
        };

        const newAccessToken = this.tokenProvider.generateAccessToken(newPayload);
        const newRefreshToken = this.tokenProvider.generateRefreshToken(newPayload);
        const newRefreshTokenHash = await this.hashProvider.generateHash(newRefreshToken);

        await this.authRepository.updateUser({
            ...currentUser,
            refresh_token_hash: newRefreshTokenHash
        });

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    }
}