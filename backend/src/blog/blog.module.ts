import { Module } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { BlogController } from "./blog.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogPost } from "./post.entity";
import { Tag } from "./tag.entity";
import { Comment } from "./comment.entity";
import { FilesModule } from "../files/files.module";

@Module({
  providers: [BlogService],
  controllers: [BlogController],
  imports: [TypeOrmModule.forFeature([BlogPost, Comment, Tag]), FilesModule],
})
export class BlogModule {}
