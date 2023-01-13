import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BlogPost } from "./post.entity";
import { Comment } from "./comment.entity";
import { User } from "../users/users.entity";
import { Tag } from "./tag.entity";

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost) private postsRepository: Repository<BlogPost>,
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
    @InjectRepository(Tag) private tagsRepository: Repository<Tag>,
  ) {}

  async getPosts(limit?: number, offset?: number, tags?: string[]) {
    if (tags.length) {
      const t = await Promise.all(
        tags.map((tag) => this.tagsRepository.findOne({ where: { id: tag } })),
      );

      return this.postsRepository.find({
        take: limit,
        skip: offset,
        relations: ["user", "tags"],
        order: { createdAt: "DESC" },
        where: { published: true, tags: t },
      });
    }

    return this.postsRepository.find({
      take: limit,
      skip: offset,
      relations: ["user", "tags"],
      order: { createdAt: "DESC" },
      where: { published: true },
    });
  }

  async getPost(slug: string) {
    return this.postsRepository.findOne({ where: { slug, published: true } });
  }

  async getPostComments(postId: string) {
    return this.commentsRepository.find({
      order: { createdAt: "DESC" },
      where: { post: { id: postId } },
      relations: ["user"],
    });
  }

  async createPost(
    title: string,
    slug: string,
    content: string,
    published: boolean,
    user: User,
  ) {
    const newPost = this.postsRepository.create({
      title,
      slug,
      content: filterXSS(content),
      published,
      author: user,
    });
    newPost.author = user;
    return this.postsRepository.save(newPost);
  }

  async updatePost(post: BlogPost) {
    post.updatedAt = new Date();
    return this.postsRepository.save(post);
  }

  async deletePost(post: BlogPost) {
    return this.postsRepository.remove(post);
  }

  async createComment(content: string, user: User) {
    const newComment = this.commentsRepository.create({ content, user });
    return this.commentsRepository.save(newComment);
  }

  async deleteComment(comment: Comment, user: User) {
    if (comment.user.id !== user.id || !user.admin) {
      throw new ForbiddenException("You can only delete your own comments");
    }
    return this.commentsRepository.remove(comment);
  }
}
