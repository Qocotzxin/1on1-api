import { generateAccessToken } from '../controllers';
import express from 'express';

const app = express();

app.get('/v1/access-token', generateAccessToken);

export default app;
