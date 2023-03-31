import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "files",
})
export class FileEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column()
  path: string;

  @Column()
  size: number;
}
