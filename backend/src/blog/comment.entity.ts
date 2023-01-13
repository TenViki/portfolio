import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/users.entity";
import { BlogPost } from "./post.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  content: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => BlogPost, (post) => post.comments)
  post: BlogPost;
}
