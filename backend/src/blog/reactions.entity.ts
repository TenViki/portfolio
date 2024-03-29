import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/users.entity";
import { BlogPost } from "./post.entity";
import { Comment } from "./comment.entity";

@Entity()
export class Reactions {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, {
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => BlogPost, (post) => post.reactions, { nullable: true })
  post: BlogPost;

  @Column({ type: "bool" })
  heart: boolean;

  @Column({ type: "bool" })
  fire: boolean;

  @Column({ type: "bool" })
  mindBlown: boolean;

  @Column({ type: "bool" })
  rocket: boolean;

  @Column({ type: "bool" })
  thumbsDown: boolean;
}
