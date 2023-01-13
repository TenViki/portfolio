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
export class BlogPost {
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

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  // @Column()
  // banner: File;
}
