import { ITokenProvider } from "../interfaces/ITokenProvider";
import jwt, { SignOptions } from 'jsonwebtoken'

export class JwtProviderService implements ITokenProvider {
    private ACCESS_SECRET: string;
    private REFRESH_SECRET: string;

    constructor() {
        this.ACCESS_SECRET = process.env.JWT_SECRET!;
        this.REFRESH_SECRET = process.env.REFRESH_SECRET!;
    }

    generateAccessToken(payload: object): string {
        return jwt.sign(payload, this.ACCESS_SECRET, { expiresIn: '15m' });
    }

    generateRefreshToken(payload: object): string {
        return jwt.sign(payload, this.REFRESH_SECRET, { expiresIn: '7d' });
    }

    verifyRefreshToken(token: string): object | string {
        return jwt.verify(token, this.REFRESH_SECRET);
    }
}