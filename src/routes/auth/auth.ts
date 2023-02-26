import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import Twilio from "twilio";
import { FastifyInstance } from "fastify";
import { queryStringSchema, responseSchema } from "./schemas.js";
import { uid } from "uid/single";

export async function routes(fastify: FastifyInstance) {
  fastify.withTypeProvider<JsonSchemaToTsProvider>().get(
    "/access-token",
    {
      schema: {
        response: {
          default: responseSchema,
        },
        querystring: queryStringSchema,
      },
    },
    async (req, rep) => {
      const AccessToken = Twilio.jwt.AccessToken;
      const VideoGrant = AccessToken.VideoGrant;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const apiKey = process.env.TWILIO_API_KEY;
      const apiSecret = process.env.TWILIO_API_SECRET;
      const errorMsg = "Could not create access token.";
      const roomQueryParam = req.query.room;
      // If a code is provided but the room does not exists do not create a new one.
      if (roomQueryParam) {
        const client = Twilio(accountSid, authToken);
        const rooms = await client.video.v1.rooms.list({
          uniqueName: roomQueryParam,
        });

        if (rooms.length === 0) {
          rep.status(404).send({
            ok: false,
            data: { token: null },
            message:
              "Specified room does not exist. Please provide the correct name or create a new room.",
          });
        }
      }

      if (accountSid && apiKey && apiSecret) {
        try {
          const room =
            req.query.room ||
            uid(16)
              .match(/.{1,4}/g)
              ?.join("-");

          const videoGrant = new VideoGrant({ room });

          const token = new AccessToken(accountSid, apiKey, apiSecret, {
            identity: "user",
          });
          token.addGrant(videoGrant);
          rep.status(200).send({
            ok: true,
            data: { token: token.toJwt() },
            message: "Access token succesfully created.",
          });
        } catch (e: unknown) {
          req.log.error({ message: errorMsg, error: e });
          rep
            .status(500)
            .send({ ok: false, data: { token: null }, message: errorMsg });
        }
      } else {
        req.log.error({
          message: "Missing env variables.",
          error: "Missing either account SID, API Key or API Secret.",
        });

        rep
          .status(500)
          .send({ ok: false, data: { token: null }, message: errorMsg });
      }
    }
  );
}
