import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
// import mongoose from "mongoose";
import { CORS_CONFIG } from './src/config';
import { cacheControl } from './src/middlewares';
import routes from './src/routes';

dotenv.config();

const app = express();

// mongoose.connect(
//   process.env.DB_URL,
//   { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
//   (err) => {
//     if (err) {
//       throw err;
//     }
//   }
// );

// Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors config
app.use(cors(CORS_CONFIG));
// Routes
app.use(routes);
// Midlewares
app.use(cacheControl);
app.use(compression());

app.listen(process.env.PORT, () => {
  console.log(`Listening server on port ${process.env.PORT}`);
});
