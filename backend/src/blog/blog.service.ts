import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BlogPost } from "./post.entity";
import { Comment } from "./comment.entity";
import { User } from "../users/users.entity";

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost) private postsRepository: Repository<BlogPost>,
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
  ) {}

  async getPosts(limit?: number, offset?: number) {
    return this.postsRepository.find({
      take: limit,
      skip: offset,
      relations: ["user"],
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

  async deleteComment(comment: Comment) {
    return this.commentsRepository.remove(comment);
  }
}
