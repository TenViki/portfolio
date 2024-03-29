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
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { BlogService } from "./blog.service";
import { AdminGuard } from "../guards/admin.guard";
import { Serialize } from "../interceptors/serialize.interceptor";
import { BlogPostDto, BlogPostListDto } from "./dtos/blog.dto";
import { NewPostDto } from "./dtos/new-post.dto";
import { CurrentUser } from "../middleware/current-user.middleware";
import { User } from "../users/users.entity";
import { NewCommentDto } from "./dtos/new-comment.dto";
import { AuthGuard } from "../guards/auth.guard";
import { NewTagDto } from "./dtos/new-tag.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ReactionInDto } from "./dtos/reaction-in.dto";

@Controller("blog")
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  @Serialize(BlogPostListDto)
  getPosts(
    @Query("l") l: string,
    @Query("o") o: string,
    @Query("tag") t: string,
  ) {
    if (isNaN(+l)) l = "10";
    if (isNaN(+o)) o = "0";
    return this.blogService.getPosts(+l, +o, t);
  }

  @Get("/tags")
  async getTags() {
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

  @Get("/comments/:postId/:commentId")
  getCommentReplies(
    @Param("postId") postId: string,
    @Param("commentId") commentId: string,
    @Query("l") l: string,
    @Query("o") o: string,
  ) {
    return this.blogService.getCommentReplies(commentId);
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

  @Patch("/:id")
  @UseGuards(AdminGuard)
  updatePost(@Body() body: NewPostDto, @Param("id") id: string) {
    return this.blogService.updatePost(id, body);
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

  @Get("/all-blog-posts-admin")
  @UseGuards(AdminGuard)
  getAllBlogPostsAdmin(@Query("l") l: string, @Query("o") o: string) {
    return this.blogService.getAllBlogPostsAdmin(+l, +o);
  }

  @Get("/:slug")
  @Serialize(BlogPostDto)
  getPost(@Param("slug") slug: string, @CurrentUser() user: User) {
    return this.blogService.getPost(slug);
  }

  @Post("/react")
  @UseGuards(AuthGuard)
  reactToPost(@Body() body: ReactionInDto, @CurrentUser() user: User) {
    return this.blogService.addReaction(body, user);
  }

  @Get("/:postId/my-reaction")
  @UseGuards(AuthGuard)
  getPostReactions(@Param("postId") postId: string, @CurrentUser() user: User) {
    return this.blogService.getUserPostReactions(postId, user);
  }
}
