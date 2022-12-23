import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    const spotifyData = await this.appService.getData();

    return {
      spotify: spotifyData
        ? {
            progress: spotifyData.progress_ms,
            name: spotifyData.item.name,
            artist: spotifyData.item.artists[0].name,
            cover: spotifyData.item.album.images[0].url,
            duration: spotifyData.item.duration_ms,
          }
        : null,
    };
  }
}
