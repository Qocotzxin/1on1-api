import fastifyEnv from "@fastify/env";
import cors from "@fastify/cors";
import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { envVariablesSchema } from "./types/env-variables.js";
import { routes as authRoutes } from "./routes/auth/index.js";
import { PinoLoggerOptions } from "fastify/types/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envToLogger: Record<
  "dev" | "prod" | "test",
  PinoLoggerOptions | boolean
> = {
  dev: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  prod: true,
  test: false,
};

const fastify: FastifyInstance = Fastify({
  // TODO: Can't use env vars here, look for alternatives.
  logger: envToLogger.dev,
  https: {
    key: fs.readFileSync(path.join(__dirname, "..", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "..", "cert.pem")),
  },
}).register(fastifyEnv, { schema: envVariablesSchema, dotenv: true });

const initialize = async () => {
  await fastify.after();

  fastify
    .register(cors, { origin: process.env.ORIGIN_BASEPATH })
    .register(authRoutes, { prefix: "/v1" });
};

initialize();

(async () => {
  try {
    await fastify.ready();
    await fastify.listen({ port: Number(process.env.PORT) || 3001 });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
})();
