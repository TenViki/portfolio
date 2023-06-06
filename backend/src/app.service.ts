import { Injectable } from "@nestjs/common";
import { SpotifyService } from "./spotify/spotify.service";

@Injectable()
export class AppService {
  constructor(private spotifyService: SpotifyService) {}

  getData() {
    return this.spotifyService.getCurrentlyPlaying();
  }
}
