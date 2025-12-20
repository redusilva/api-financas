import express from 'express';
import { AuthExpressController } from '../controllers/AuthExpressController';
import { AuthService } from '../services/AuthService';
import { AuthPgRepository } from '../repositories/AuthPgRepository';
import { validate } from '../middlewares/validate';
import { CreateUserSchema } from '../schemas/CreateUserSchema';
import { PgTransactionManager } from '../database/PgTransactionManager';
import { LoginUserSchema } from '../schemas/LoginUserSchema';
import { ValidateRefreshTokenSchema } from '../schemas/ValidateRefreshTokenSchema';
import { BcryptHashProviderService } from '../services/BcryptyHashProviderService';
import { JwtProviderService } from '../services/JwtProviderService';
import { EmailService } from '../services/EmailService';
import { CryptoCodeService } from '../services/CryptoCodeService';

const router = express.Router();

const authRepository = new AuthPgRepository();
const trx = new PgTransactionManager();
const bcryptHashProvider = new BcryptHashProviderService();
const jwtTokenProvider = new JwtProviderService();
const emailService = new EmailService();
const cryptoCodeService = new CryptoCodeService();
const authService = new AuthService({
    authRepository: authRepository,
    hashProvider: bcryptHashProvider,
    tokenProvider: jwtTokenProvider,
    emailService: emailService,
    randomCodeService: cryptoCodeService
});
const authController = new AuthExpressController({
    authService: authService,
    trx: trx,
});

router.post('/login', validate(LoginUserSchema), (req, res) => authController.login(req, res));

router.post('/refresh', validate(ValidateRefreshTokenSchema), (req, res) => authController.refreshToken(req, res));

router.post('/', validate(CreateUserSchema), (req, res) => authController.createUser(req, res));

export default router;