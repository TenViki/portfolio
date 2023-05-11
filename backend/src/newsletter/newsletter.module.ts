import { Module } from "@nestjs/common";
import { NewsletterService } from "./newsletter.service";
import { MailingController } from "./newsletter.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NewsletterRecord } from "./newsletter.entity";
import { Tag } from "../blog/tag.entity";

@Module({
  providers: [NewsletterService],
  controllers: [MailingController],
  imports: [TypeOrmModule.forFeature([NewsletterRecord, Tag])],
  exports: [NewsletterService],
})
export class NewsletterModule {}
