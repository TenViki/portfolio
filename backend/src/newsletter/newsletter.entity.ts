import {
  Column,
  CreateDateColumn,
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

  @ManyToMany(() => Tag, { onDelete: "CASCADE" })
  @JoinTable()
  preferences: Tag[];

  @Column({ default: false })
  confirmed: boolean;

  @Column({ default: "en" })
  language: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  regIP: string;
}
