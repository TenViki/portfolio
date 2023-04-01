import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../users/users.entity";
import { Comment } from "./comment.entity";
import { Tag } from "./tag.entity";
import { FileEntity } from "../files/file.entity";

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

  @OneToMany(() => Comment, (comment) => comment.post, {
    cascade: true,
  })
  comments: Comment[];

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @ManyToOne(() => FileEntity, {
    onDelete: "SET NULL",
  })
  banner: FileEntity;
}
