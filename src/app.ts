import express, { Request, Response } from 'express';
import AuthRoutes from './routes/AuthRoutes';

const app = express();

app.use(express.json());

app.use('/auth', AuthRoutes);

// Exemplo de rota
app.get('/', (req: Request, res: Response) => {
    res.send('API funcionando!');
});

export default app;
