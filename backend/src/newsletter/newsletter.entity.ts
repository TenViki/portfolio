import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tag } from "../blog/tag.entity";

@Entity()
export class NewsletterRecord {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @ManyToMany(() => Tag)
  @JoinTable()
  preferences: Tag[];

  @Column({ default: false })
  confirmed: boolean;

  @Column({ default: "en" })
  language: string;
}
