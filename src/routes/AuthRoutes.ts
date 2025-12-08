import express from 'express';
import { AuthExpressController } from '../controllers/AuthExpressController';
import { AuthService } from '../services/AuthService';
import { AuthPgRepository } from '../repositories/AuthPgRepository';
import { validate } from '../middlewares/validate';
import { CreateUserSchema } from '../schemas/CreateUserSchema';
import { PgTransactionManager } from '../database/PgTransactionManager';

const router = express.Router();

const authRepository = new AuthPgRepository();
const trx = new PgTransactionManager();
const authService = new AuthService({
    authRepository: authRepository
});
const authController = new AuthExpressController({
    authService: authService,
    trx: trx
});

router.post('/', validate(CreateUserSchema), (req, res) => authController.createUser(req, res));

export default router;