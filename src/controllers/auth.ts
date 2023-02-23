import { FastifyReply, FastifyRequest } from "fastify";
import Twilio from "twilio";
import { GetAccessTokenSchema } from "../routes/auth/schemas";
import { FastifyCustomReply } from "../types/fastify";

export function generateAccessToken(
  req: FastifyRequest,
  rep: FastifyCustomReply<GetAccessTokenSchema>
) {
  const AccessToken = Twilio.jwt.AccessToken;
  const VideoGrant = AccessToken.VideoGrant;
  const accountSid = "";
  const apiKey = process.env.TWILIO_API_KEY;
  const apiSecret = process.env.TWILIO_API_SECRET;

  const videoGrant = new VideoGrant({
    room: "Test room",
  });

  if (accountSid && apiKey && apiSecret) {
    let token;
    try {
      token = new AccessToken(accountSid, apiKey, apiSecret, {
        identity: "user",
      });
      token.addGrant(videoGrant);
    } catch (e: unknown) {
      req.log.error({ message: "Access Token creation failed.", error: e });
      return rep.status(500).send({
        ok: false,
        data: { token: null },
        message: "Access Token creation failed.",
      });
    }

    return rep.status(200).send({
      ok: true,
      data: { token: token.toJwt() },
      message: "Access token succesfully created.",
    });
  } else {
    req.log.error({
      message: "Missing env variables.",
      error: "Missing either account SID, API Key or API Secret.",
    });

    return rep.status(500).send({
      ok: false,
      data: {},
      message: "Access Token creation failed.",
    });
  }
}
