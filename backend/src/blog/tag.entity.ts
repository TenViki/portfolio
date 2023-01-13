import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { BlogPost } from "./post.entity";

@Entity()
export class Tag {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => BlogPost)
  posts: BlogPost[];
}
