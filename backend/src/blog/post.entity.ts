import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../users/users.entity";
import { Comment } from "./comment.entity";
import { Tag } from "./tag.entity";
import { FileEntity } from "../files/file.entity";
import { Reactions } from "./reactions.entity";

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

  @Column({ default: 0 })
  views: number;

  @OneToMany(() => Reactions, (reactions) => reactions.post, {
    cascade: true,
  })
  reactions: Reactions[];

  publicReactions: {
    heart: number;
    fire: number;
    mindBlown: number;
    rocket: number;
    thumbsDown: number;
  };

  @AfterLoad()
  countReactions() {
    const reactions = this.reactions;

    console.log(reactions);

    this.publicReactions = {
      heart: 0,
      fire: 0,
      mindBlown: 0,
      rocket: 0,
      thumbsDown: 0,
    };

    if (!reactions) return;

    for (const reaction of reactions) {
      for (const key in reaction) {
        if (reaction[key]) this.publicReactions[key]++;
      }
    }
  }
}
