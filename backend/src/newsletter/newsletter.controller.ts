import { Body, Controller, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { NewsletterService } from "./newsletter.service";
import { SubscribeDto } from "./dtos/subscribe.dto";
import { UpdatePreferencesDto } from "./dtos/updatePreferences.dto";
import { Request } from "express";

@Controller("mailing")
export class MailingController {
  constructor(private newsletterService: NewsletterService) {}

  @Post("subscribe")
  async subscribe(@Body() body: SubscribeDto, @Req() req: Request) {
    await this.newsletterService.signupWithConfirmation(
      body.email,
      body.name,
      body.language,
      req.header("cf-connecting-ip") || req.ip,
    );
  }

  @Get("preferences/:id")
  async getPreferences(@Param("id") id: string) {
    return this.newsletterService.getPreferences(id);
  }

  @Patch("preferences/:id")
  async updatePreferences(
    @Param("id") id: string,
    @Body() { preferences, name, language }: UpdatePreferencesDto,
  ) {
    return this.newsletterService.updatePreferences(
      id,
      preferences,
      name,
      language,
    );
  }

  @Post("unsubscribe/:id")
  async unsubscribe(@Param("id") id: string) {
    return this.newsletterService.unsubscribe(id);
  }
}
