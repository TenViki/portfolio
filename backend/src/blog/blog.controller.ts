import { Controller, Get, Param } from "@nestjs/common";
import { BlogService } from "./blog.service";

@Controller("blog")
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  getPosts() {
    return this.blogService.getPosts();
  }

  @Get("/:slug")
  getPost(@Param("slug") slug: string) {
    return this.blogService.getPost(slug);
  }
}
