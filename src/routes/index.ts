import express from 'express';
import authRoutes from './auth';

const app = express();

app.use(authRoutes);

export default app;
