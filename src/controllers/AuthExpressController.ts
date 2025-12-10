import { Request, Response } from "express";
import { IAuthController } from "../interfaces/IAuthController";
import { IAuthService } from "../interfaces/IAuthService";
import { CreateUserDTO } from "../types/CreateUserDTO";
import { ITransactionManager } from "../interfaces/ITransactionManager";
import { AppError } from "../errors/AppError";

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
        const data: CreateUserDTO = req.body;

        const user = await this.authService.createUser(data);

        return res.status(201).json({
            message: 'User created successfully',
            user,
        });
    }
}