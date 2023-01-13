import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/users.entity";
import { Post } from "./post.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  content: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}
