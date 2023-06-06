import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OAuth2Client } from "google-auth-library/build/src/auth/oauth2client";

@Injectable()
export class GoogleService implements OnModuleInit {
  private auth: OAuth2Client;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.auth = new OAuth2Client({
      clientId: this.configService.get("GOOGLE_CLIENT_ID"),
      clientSecret: this.configService.get("GOOGLE_CLIENT_SECRET"),
      redirectUri: this.configService.get("GOOGLE_REDIRECT_URI"),
    });
  }

  async getGoogleUser(token: string) {
    const ticket = await this.auth.verifyIdToken({
      idToken: token,
      audience: this.configService.get("GOOGLE_CLIENT_ID"),
    });

    return ticket.getPayload();
  }
}
