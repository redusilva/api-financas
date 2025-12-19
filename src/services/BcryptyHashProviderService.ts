import { IHashProvider } from "../interfaces/IHashProvider";
import bcrypt from 'bcrypt';

export class BcryptHashProviderService implements IHashProvider {
    private saltRounds: number;

    constructor() {
        this.saltRounds = process.env.BCRYPT_SALT_ROUNDS ? parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) : 10;
    }

    async generateHash(payload: string): Promise<string> {
        return bcrypt.hash(payload, this.saltRounds);
    }

    async compareHash(payload: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(payload, hashed);
    }
}