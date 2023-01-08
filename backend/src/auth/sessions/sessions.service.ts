import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Session } from "./sessions.entity";
import { Repository } from "typeorm";
import { User } from "../../users/users.entity";

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session) private sessionrepo: Repository<Session>,
  ) {}

  createSession(user: User, expiresAt: Date) {
    const session = this.sessionrepo.create({
      user,
    });
    return this.sessionrepo.save(session);
  }

  async getSession(sessionId: string) {
    const session = await this.sessionrepo.findOne({
      where: { id: sessionId },
    });
    if (!session) {
      return null;
    }
    await this.sessionrepo.save(session);
    return session;
  }

  async deleteSession(sessionId: string) {
    const session = await this.sessionrepo.findOne({
      where: { id: sessionId },
    });
    if (!session) {
      return null;
    }
    return this.sessionrepo.remove(session);
  }
}
