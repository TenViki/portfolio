import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
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

  @ManyToOne(() => Comment, (comment) => comment.responses, {
    nullable: true,
    onDelete: "CASCADE",
  })
  responseTo: Comment;

  @OneToMany(() => Comment, (comment) => comment.responseTo, {
    nullable: true,
  })
  responses: Comment[];

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
