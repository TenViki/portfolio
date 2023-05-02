import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/users.entity";
import { BlogPost } from "./post.entity";
import { Comment } from "./comment.entity";

@Entity()
export class Reactions {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => BlogPost, (post) => post.reactions, { nullable: true })
  post: BlogPost;

  @ManyToOne(() => Comment, (post) => post.reactions, { nullable: true })
  comment: Comment;

  @Column()
  heart: boolean;

  @Column()
  fire: boolean;

  @Column()
  mindBlown: boolean;

  @Column()
  rocket: boolean;

  @Column()
  thumbsDown: boolean;
}
