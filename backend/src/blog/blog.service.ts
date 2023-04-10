import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BlogPost } from "./post.entity";
import { Comment } from "./comment.entity";
import { User } from "../users/users.entity";
import { Tag } from "./tag.entity";
import { NotFoundException } from "@nestjs/common/exceptions";
import { NewPostDto } from "./dtos/new-post.dto";
import { NewTagDto } from "./dtos/new-tag.dto";
import { filterXSS } from "xss";
import { FilesService } from "../files/files.service";

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost) private postsRepository: Repository<BlogPost>,
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
    @InjectRepository(Tag) private tagsRepository: Repository<Tag>,
    private filesService: FilesService,
  ) {}

  async getTags() {
    return this.tagsRepository.find();
  }

  toSlug(text: string) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s\s+/g, " ")
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }

  async createTag(tag: NewTagDto) {
    const newTag = this.tagsRepository.create({
      name: tag.name,
      color: tag.color,
      slug: this.toSlug(tag.name),
    });
    return this.tagsRepository.save(newTag);
  }

  async deleteTag(id: string) {
    return this.tagsRepository.delete(id);
  }

  async updateTag(id: string, tagData: NewTagDto) {
    const tag = await this.tagsRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException("Tag not found");
    }

    tag.name = tagData.name;
    tag.color = tagData.color;
    tag.slug = this.toSlug(tagData.name);

    return this.tagsRepository.save(tag);
  }

  async getPosts(limit?: number, offset?: number, tags?: string[]) {
    const posts = await this.postsRepository.find({
      take: limit,
      skip: offset,
      relations: ["author", "tags", "banner"],
      order: { createdAt: "DESC" },
      where: { published: true },
    });

    if (tags) {
      return posts.filter((post) => {
        return post.tags.some((tag) => tags.includes(tag.id));
      });
    }

    return posts;
  }

  async getAllBlogPostsAdmin(limit?: number, offset?: number) {
    if (isNaN(limit)) limit = undefined;
    if (isNaN(offset)) offset = undefined;
    return this.postsRepository.find({
      take: limit,
      skip: offset,
      relations: ["author", "tags", "banner"],
      order: { createdAt: "DESC" },
    });
  }

  async getPost(slug: string) {
    const post = await this.postsRepository.findOne({
      where: { slug, published: true },
      relations: ["author", "tags", "banner"],
    });

    if (!post) throw new NotFoundException("Post not found");

    return post;
  }

  async getPostComments(postId: string, limit?: number, offset?: number) {
    return this.commentsRepository.find({
      order: { createdAt: "DESC" },
      where: { post: { id: postId } },
      relations: ["user"],
      take: limit,
      skip: offset,
    });
  }

  async createPost(object: NewPostDto, user: User) {
    const t = await Promise.all(
      object.tags.map((tag) =>
        this.tagsRepository.findOne({ where: { id: tag } }),
      ),
    );

    let file = null;

    if (object.bannerImageId) {
      file = await this.filesService.getFile(object.bannerImageId);
    }

    const newPost = this.postsRepository.create({
      title: object.title,
      slug: object.slug,
      content: object.content,
      published: object.published,
      author: user,
      tags: t,
      banner: file,
    });
    newPost.author = user;
    return this.postsRepository.save(newPost);
  }

  async updatePost(id: string, postData: NewPostDto) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ["tags", "banner"],
    });

    if (!post) {
      throw new NotFoundException("No post with that id");
    }

    const t = await Promise.all(
      postData.tags.map((tag) =>
        this.tagsRepository.findOne({ where: { id: tag } }),
      ),
    );

    let file = post.banner;

    if (postData.bannerImageId) {
      file = await this.filesService.getFile(postData.bannerImageId);
    }

    post.title = postData.title;
    post.slug = postData.slug;
    post.content = postData.content;
    post.published = postData.published;
    post.tags = t;
    post.banner = file;

    post.updatedAt = new Date();
    return this.postsRepository.save(post);
  }

  async deletePost(postId: string) {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
    });
    return this.postsRepository.remove(post);
  }

  async createComment(
    content: string,
    postId: string,
    user: User,
    responseTo?: string,
  ) {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
    });

    if (responseTo) {
      const response = await this.commentsRepository.findOne({
        where: { id: responseTo },
      });
      if (!response) {
        throw new NotFoundException("No comment with that id");
      }

      const newComment = this.commentsRepository.create({
        content,
        user,
        post,
        responseTo: response,
      });
      return this.commentsRepository.save(newComment);
    }

    const newComment = this.commentsRepository.create({ content, user });
    return this.commentsRepository.save(newComment);
  }

  async deleteComment(commentId: string, user: User) {
    const comment = await this.commentsRepository.findOne({
      where: { id: commentId },
      relations: ["user"],
    });

    if (!comment) throw new NotFoundException("No comment with that id");

    if (comment.user.id !== user.id || !user.admin) {
      throw new ForbiddenException("You can only delete your own comments");
    }
    return this.commentsRepository.remove(comment);
  }

  async fetchReplies(commentId: string) {
    return this.commentsRepository.find({
      where: { responseTo: { id: commentId } },
      relations: ["user"],
    });
  }
}
