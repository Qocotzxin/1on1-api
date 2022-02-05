import { Request, Response } from 'express';
import Twilio from 'twilio';

export function generateAccessToken(req: Request, res: Response) {
  const AccessToken = Twilio.jwt.AccessToken;
  const VideoGrant = AccessToken.VideoGrant;
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const apiKey = process.env.TWILIO_API_KEY;
  const apiSecret = process.env.TWILIO_API_SECRET;

  const videoGrant = new VideoGrant({
    room: 'Test room',
  });

  if (accountSid && apiKey && apiSecret) {
    let token;
    try {
      token = new AccessToken(accountSid, apiKey, apiSecret, {
        identity: 'user',
      });
      token.addGrant(videoGrant);
    } catch (e: unknown) {
      return res.status(500).json({
        ok: true,
        data: { token: false, error: e },
        message: 'Access Token creation failed due to an internal error.',
      });
    }

    return res.status(200).json({
      ok: true,
      data: { token: token.toJwt() },
      message: 'Access token succesfully created.',
    });
  } else {
    return res.status(500).json({
      ok: false,
      data: { token: false, error: 'Internal server error.' },
      message:
        'Access Token creation failed. Not enough information to process it.',
    });
  }
}
