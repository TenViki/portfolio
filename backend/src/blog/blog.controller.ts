import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Query,
  Post,
  Body,
  Patch,
} from "@nestjs/common";
import { BlogService } from "./blog.service";
import { AdminGuard } from "../guards/admin.guard";
import { Serialize } from "../interceptors/serialize.interceptor";
import { BlogPostDto } from "./dtos/blog.dto";
import { NewPostDto } from "./dtos/new-post.dto";
import { CurrentUser } from "../middleware/current-user.middleware";
import { User } from "../users/users.entity";
import { NewCommentDto } from "./dtos/new-comment.dto";
import { AuthGuard } from "../guards/auth.guard";
import { NewTagDto } from "./dtos/new-tag.dto";

@Controller("blog")
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  @Serialize(BlogPostDto)
  getPosts() {
    return this.blogService.getPosts();
  }

  @Get("/tags")
  async getTags() {
    console.log("the fuck is this", await this.blogService.getTags());
    return this.blogService.getTags();
  }

  @Delete("/tags/:id")
  @UseGuards(AdminGuard)
  deleteTag(@Param("id") id: string) {
    return this.blogService.deleteTag(id);
  }

  @Get("/comments/:postId")
  getPostComments(
    @Param("postId") postId: string,
    @Query("l") l: string,
    @Query("o") o: string,
  ) {
    return this.blogService.getPostComments(postId, +l, +o);
  }

  @Post("/tags")
  @UseGuards(AdminGuard)
  createTag(@Body() newTagObj: NewTagDto) {
    return this.blogService.createTag(newTagObj);
  }

  @Patch("/tags/:id")
  @UseGuards(AdminGuard)
  updateTag(@Param("id") id: string, @Body() tagData: NewTagDto) {
    return this.blogService.updateTag(id, tagData);
  }

  @Post("/")
  @UseGuards(AdminGuard)
  createPost(@Body() body: NewPostDto, @CurrentUser() user: User) {
    return this.blogService.createPost(body, user);
  }

  @Delete("/:id")
  @UseGuards(AdminGuard)
  deletePost(@Param("id") id: string) {
    return this.blogService.deletePost(id);
  }

  @Post("/comments")
  @UseGuards(AuthGuard)
  createComment(@Body() body: NewCommentDto, @CurrentUser() user: User) {
    return this.blogService.createComment(
      body.content,
      body.postId,
      user,
      body.parentCommentId,
    );
  }

  @Delete("/comments/:id")
  @UseGuards(AuthGuard)
  deleteComment(@Param("id") id: string, @CurrentUser() user: User) {
    return this.blogService.deleteComment(id, user);
  }

  @Get("/:slug")
  getPost(@Param("slug") slug: string) {
    return this.blogService.getPost(slug);
  }
}
