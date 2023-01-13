import {
  ExecutionContext,
  Injectable,
  NestMiddleware,
  createParamDecorator,
} from "@nestjs/common";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { SessionsService } from "../auth/sessions/sessions.service";
import { User } from "../users/users.entity";
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private sessionsService: SessionsService) {}

  async use(req: Request, res: Response, next: (error?: any) => void) {
    const { authorization } = req.headers;
    if (!authorization) return next();

    try {
      const { sessionId } = jwt.verify(
        authorization,
        process.env.JWT_SECRET,
      ) as {
        sessionId: string;
      };
      const session = await this.sessionsService.getSession(sessionId);
      if (!session) return next();

      req.user = session.user;

      next();
    } catch (error) {
      return next();
    }
  }
}
