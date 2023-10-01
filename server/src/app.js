import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

app.use('/', todoRoutes);

export default app;
