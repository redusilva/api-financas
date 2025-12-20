import { Request, Response } from "express";
import { IAuthController } from "../interfaces/IAuthController";
import { IAuthService } from "../interfaces/IAuthService";
import { ITransactionManager } from "../interfaces/ITransactionManager";
import { CreateUserDTO } from "../types/CreateUserDTO";

type Props = {
    authService: IAuthService;
    trx?: ITransactionManager;
}

export class AuthExpressController implements IAuthController {
    private authService: IAuthService;
    private trx: ITransactionManager | undefined;

    constructor(props: Props) {
        this.authService = props.authService;
        this.trx = props.trx;
    }

    async createUser(req: Request, res: Response): Promise<any> {
        try {
            const data: CreateUserDTO = req.body;

            const user = await this.authService.createUser(data);

            return res.status(200).json({
                message: 'User logged in successfully',
                user,
            });
        } catch (error) {
            console.error('Error during user creation:', error);
            return res.status(500).json({
                message: 'Internal server error',
            });
        }
    }

    async login(req: Request, res: Response): Promise<any> {
        try {
            const { email, password } = req.body;
            const authData = await this.authService.login(email, password);

            return res.status(200).json({
                message: 'User logged in successfully',
                access_token: authData.accessToken,
                refresh_token: authData.refreshToken,
            });
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({
                message: 'Internal server error',
            });
        }
    }

    async refreshToken(req: Request, res: Response): Promise<any> {

        const refreshToken = req.body.refresh_token;
        const authData = await this.authService.refreshToken(refreshToken);

        return res.status(200).json({
            message: 'Token refreshed successfully',
            access_token: authData.accessToken,
            refresh_token: authData.refreshToken,
        });
    }
}