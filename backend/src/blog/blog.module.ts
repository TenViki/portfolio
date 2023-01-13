import { Module } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { BlogController } from "./blog.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./post.entity";

@Module({
  providers: [BlogService],
  controllers: [BlogController],
  imports: [TypeOrmModule.forFeature([Post, Comment])],
})
export class BlogModule {}
