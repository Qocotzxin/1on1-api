export const responseSchema = {
  type: "object",
  required: ["ok", "data", "message"],
  properties: {
    ok: {
      type: "boolean",
      description:
        "A boolan value to quickly determine if the operation was successful or not.",
    },
    data: {
      type: "object",
      required: ["token"],
      description: "An object that contains the requested data (if any).",
      properties: {
        token: {
          type: "string",
          nullable: true,
          description:
            "The token generated by Twilio (or null if the token could not be generated).",
        },
      },
    },
    message: {
      type: "string",
      description:
        "A short message that provides information about the response.",
    },
  },
} as const;

export const queryStringSchema = {
  type: "object",
  properties: {
    room: { type: "string" },
  },
} as const;
