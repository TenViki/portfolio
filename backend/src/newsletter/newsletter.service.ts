import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NewsletterRecord } from "./newsletter.entity";
import { Repository } from "typeorm";
import { Tag } from "../blog/tag.entity";

@Injectable()
export class NewsletterService {
  constructor(
    @InjectRepository(NewsletterRecord)
    private mailingRepo: Repository<NewsletterRecord>,
    @InjectRepository(Tag)
    private tagRepo: Repository<Tag>,
  ) {}

  async addSubscriber(name: string, email: string) {
    // default all subscribers to all tags
    const tags = await this.tagRepo.find();
    return this.mailingRepo.save({ name, email, preferences: tags });
  }
}
