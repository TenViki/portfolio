import { BadRequestException, Injectable } from "@nestjs/common";
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

  getSubjectName(language: string) {
    if (language === "en") return "Viki's newsletter";
    else if (language === "cs") return "Vikiho novinky";
    else throw new BadRequestException("Invalid language");
  }

  getWelcomeSubject(language: string) {
    if (language === "en") return "Welcome to my newsletter!";
    else if (language === "cs") return "Vítejte v mém newsletteru!";
    else throw new BadRequestException("Invalid language");
  }

  getConfirmationSubject(language: string) {
    if (language === "en") return "Subscription confirmed!";
    else if (language === "cs") return "Přihlášení newsletteru potvrzeno!";
    else throw new BadRequestException("Invalid language");
  }

  async getNewsletterRecord(email: string) {
    return this.mailingRepo.findOne({ where: { email, confirmed: true } });
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
      from: this.getSubjectName("en") + " <blog@vikithedev.eu>",
      subject: this.getWelcomeSubject("en"),
      html: content,
    };

    await await sgMail.send(message);
  }

  async signupWithConfirmation(email: string, name: string, language: string) {
    if (language !== "en" && language !== "cs") language = "en";
    if (await this.getNewsletterRecord(email))
      throw new BadRequestException("Email already registered");

    const tags = await this.tagRepo.find();

    const record = this.mailingRepo.create({
      email,
      name,
      preferences: tags,
      language,
    });

    const savedRecord = await this.mailingRepo.save(record);

    const confirmationLink = `${process.env.FRONTEND_URL}/newsletter/preferences/${savedRecord.id}`;

    const content = (
      await fs.readFile(`./templates/welcome_confirm_${language}.html`, "utf-8")
    )
      .replaceAll("{{confirmation_url}}", confirmationLink)
      .replaceAll("{{name}}", name);

    const message = {
      to: email,
      from: this.getSubjectName(language) + " <blog@vikithedev.eu>",
      subject: this.getWelcomeSubject(language),
      html: content,
    };

    await await sgMail.send(message);
  }

  async getPreferences(id: string) {
    const record = await this.mailingRepo.findOne({
      where: { id },
      relations: ["preferences"],
    });
    if (!record) throw new BadRequestException("Invalid ID");

    let hasConfirmed = false;

    const preferencesLink = `${process.env.FRONTEND_URL}/newsletter/preferences/${id}`;

    if (!record.confirmed) {
      const content = (
        await fs.readFile(
          `./templates/confirmed_${record.language}.html`,
          "utf-8",
        )
      )
        .replaceAll("{{name}}", record.name)
        .replaceAll("{{preferences_url}}", preferencesLink);

      const message = {
        to: record.email,
        from: this.getSubjectName(record.language) + " <blog@vikithedev.eu>",
        subject: this.getConfirmationSubject(record.language),
        html: content,
      };

      await sgMail.send(message);

      record.confirmed = true;

      hasConfirmed = true;

      await this.mailingRepo.save(record);
    }

    return {
      preferences: record.preferences,
      hasConfirmed,
      language: record.language,
      name: record.name,
    };
  }

  async updatePreferences(
    id: string,
    preferences: string[],
    name: string,
    lang: string,
  ) {
    const record = await this.mailingRepo.findOne({
      where: { id },
      relations: ["preferences"],
    });
    if (!record) throw new BadRequestException("Invalid ID");

    const newPreferences = await this.tagRepo.find({
      where: preferences.map((p) => ({ id: p })),
    });

    record.name = name;
    record.preferences = newPreferences;
    record.language = lang;

    await this.mailingRepo.save(record);
  }
}
