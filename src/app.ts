import express, { Request, Response } from 'express';
import AuthRoutes from './routes/AuthRoutes';
import swaggerDocument from "../swagger.json";
import swaggerUI from "swagger-ui-express";
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json());

app.use('/auth', AuthRoutes);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/', (req: Request, res: Response) => {
    res.send('API funcionando!');
});

app.use(errorHandler);

export default app;
