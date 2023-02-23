import { generateAccessToken } from "../../controllers/auth.js";
import { getSchema } from "./schemas.js";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { FastifyInstance } from "fastify";

export async function routes(fastify: FastifyInstance) {
  fastify
    .withTypeProvider<JsonSchemaToTsProvider>()
    .get("/access-token", getSchema, generateAccessToken);
}
