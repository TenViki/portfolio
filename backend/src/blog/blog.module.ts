import { Module } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { BlogController } from "./blog.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogPost } from "./post.entity";
import { BlogController } from './blog.controller';

@Module({
  providers: [BlogService],
  controllers: [BlogController],
  imports: [TypeOrmModule.forFeature([BlogPost, Comment])],
})
export class BlogModule {}
