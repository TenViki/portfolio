import { Injectable } from "@nestjs/common";
import { GoogleService } from "../google/google.service";
import { LoginDto } from "./login.dto";
import { UsersService } from "../users/users.service";
import * as jwt from "jsonwebtoken";
import { SessionsService } from "./sessions/sessions.service";
import { NewsletterService } from "../newsletter/newsletter.service";

@Injectable()
export class AuthService {
  constructor(
    private googleService: GoogleService,
    private usersService: UsersService,
    private sessionsService: SessionsService,
    private newsletterService: NewsletterService,
  ) {}

  async login(loginDto: LoginDto) {
    const userData = await this.googleService.getGoogleUser(
      loginDto.googleToken,
    );

    let user = await this.usersService.findOne({ googleId: userData.sub });
    if (!user) {
      user = await this.usersService.create({
        picture: userData.picture,
        name: userData.name,
        googleId: userData.sub,
        email: userData.email,
      });

      await this.newsletterService.addSubscriber(userData.name, userData.email);
    } else {
      user.picture = userData.picture;
      user.name = userData.name;
      user.email = userData.email;
      await this.usersService.update(user);
    }

    const session = await this.sessionsService.createSession(user, new Date());
    const token = jwt.sign({ sessionId: session.id }, process.env.JWT_SECRET);

    return { user, token };
  }
}
