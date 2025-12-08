export interface IAuthController {
    createUser(req: any, res: any): Promise<void>;
}