import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../users/users.entity";
import { BlogPost } from "./post.entity";
import { Reactions } from "./reactions.entity";

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

  @ManyToOne(() => Comment, (comment) => comment.responses, { nullable: true })
  responseTo: Comment;

  @OneToMany(() => Comment, (comment) => comment.responseTo)
  responses: Comment[];

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @OneToMany(() => Reactions, (reactions) => reactions.comment, {
    nullable: true,
  })
  reactions: Reactions[];
}
