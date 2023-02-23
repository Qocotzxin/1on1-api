import {
  ContextConfigDefault,
  FastifyReply,
  FastifySchema,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteGenericInterface,
} from "fastify";

import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";

export type FastifyCustomReply<T> = FastifyReply<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  RouteGenericInterface,
  ContextConfigDefault,
  FastifySchema,
  JsonSchemaToTsProvider,
  T
>;
