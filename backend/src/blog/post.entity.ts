import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../users/users.entity";
import { Comment } from "./comment.entity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  content: string;

  @Column()
  published: boolean;

  @ManyToOne(() => User)
  author: User;

  @Column()
  createdAt: Date;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
