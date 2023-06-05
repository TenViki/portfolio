import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NewsletterRecord } from "./newsletter.entity";
import { Repository } from "typeorm";
import { Tag } from "../blog/tag.entity";
import * as fs from "fs/promises";
import * as sgMail from "@sendgrid/mail";

@Injectable()
export class NewsletterService {
  constructor(
    @InjectRepository(NewsletterRecord)
    private mailingRepo: Repository<NewsletterRecord>,
    @InjectRepository(Tag)
    private tagRepo: Repository<Tag>,
  ) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async getNewsletterRecord(email: string) {
    return this.mailingRepo.findOne({ where: { email } });
  }

  async signup(email: string, name: string) {
    console.log("email:", await this.getNewsletterRecord(email));
    if (await this.getNewsletterRecord(email)) return;

    const tags = await this.tagRepo.find();

    const record = this.mailingRepo.create({
      email,
      name,
      preferences: tags,
      confirmed: true,
    });

    const savedRecord = await this.mailingRepo.save(record);

    const preferencesLink = `${process.env.FRONTEND_URL}/newsletter/preferences/${savedRecord.id}`;

    const content = (
      await fs.readFile("./templates/welcome_signup_en.html", "utf-8")
    )
      .replaceAll("{{preferences_url}}", preferencesLink)
      .replaceAll("{{name}}", name);

    const message = {
      to: email,
      from: "Viki's newsletter <blog@vikithedev.eu>",
      subject: "Welcome to my Blog!",
      html: content,
    };

    await await sgMail.send(message);
  }
}
