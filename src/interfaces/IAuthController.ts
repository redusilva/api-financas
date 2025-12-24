export interface IAuthController {
    createUser(req: any, res: any): Promise<void>;
    login(req: any, res: any): Promise<void>;
    refreshToken(req: any, res: any): Promise<void>;
    validateEmail(req: any, res: any): Promise<void>;
}