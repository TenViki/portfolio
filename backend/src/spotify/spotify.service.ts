import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { SpotifyCurrentlyPlayingResponse } from "../types/spotify.type";

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";

@Injectable()
export class SpotifyService implements OnModuleInit {
  private accessToken: string;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.accessToken = await this.refreshToken();
  }

  async refreshToken() {
    const refreshToken = this.configService.get("SPOTIFY_REFRESH_TOKEN");
    const clientSecret = this.configService.get("SPOTIFY_CLIENT_SECRET");
    const clientId = this.configService.get("SPOTIFY_CLIENT_ID");

    const response = await axios.post(
      SPOTIFY_TOKEN_URL,
      {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            clientId + ":" + clientSecret,
          ).toString("base64")}`,
        },
      },
    );

    const accessToken = response.data.access_token;
    return accessToken;
  }

  async getCurrentlyPlaying(): Promise<SpotifyCurrentlyPlayingResponse | null> {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );

    if (!response.data) {
      return null;
    }

    return response.data;
  }
}
