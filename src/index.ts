import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import fastifyEnv from "@fastify/env";
import { envVariablesSchema } from "./types/env-variables.js";
import { routes as authRoutes } from "./routes/auth/index.js";

const server: FastifyInstance = Fastify({ logger: { level: "error" } })
  .register(fastifyEnv, { schema: envVariablesSchema, dotenv: true })
  .register(authRoutes, { prefix: "/v1" });

const start = async () => {
  try {
    await server.listen({ port: Number(process.env.PORT) || 3001 });
    console.log("Listening port", server.config.PORT);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
