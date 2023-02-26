export const envVariablesSchema = {
  type: "object",
  required: [
    "PORT",
    "ENVIRONMENT",
    "ORIGIN_BASEPATH",
    "TWILIO_ACCOUNT_SID",
    "TWILIO_AUTH_TOKEN",
    "TWILIO_API_KEY",
    "TWILIO_API_SECRET",
  ],
  properties: {
    PORT: {
      type: "string",
      default: 3001,
    },
    ENVIRONMENT: {
      type: "string",
    },
    ORIGIN_BASEPATH: {
      type: "string",
    },
    TWILIO_ACCOUNT_SID: {
      type: "string",
    },
    TWILIO_AUTH_TOKEN: {
      type: "string",
    },
    TWILIO_API_KEY: {
      type: "string",
    },
    TWILIO_API_SECRET: {
      type: "string",
    },
  },
};

declare module "fastify" {
  interface FastifyInstance {
    config: {
      PORT: string;
      ORIGIN_BASEPATH: string;
      TWILIO_ACCOUNT_SID: string;
      TWILIO_AUTH_TOKEN: string;
      TWILIO_API_KEY: string;
      TWILIO_API_SECRET: string;
    };
  }
}
