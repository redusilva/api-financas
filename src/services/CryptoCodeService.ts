import { randomInt } from 'crypto';
import { IRandomCodeService } from '../interfaces/IRandomCodeService';

export class CryptoCodeService implements IRandomCodeService {
    generate(length: number): string {
        const max = Math.pow(10, length);
        return randomInt(0, max).toString().padStart(length, '0');
    }
}