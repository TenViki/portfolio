import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Session } from "../auth/sessions/sessions.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  picture: string;

  @Column()
  googleId: string;

  @Column({ default: false })
  admin: boolean;

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];
}
