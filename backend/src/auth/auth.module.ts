import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { GoogleModule } from "../google/google.module";
import { SessionsService } from "./sessions/sessions.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Session } from "./sessions/sessions.entity";
import { UsersModule } from "../users/users.module";
import { MiddlewareConsumer } from "@nestjs/common/interfaces";
import { CurrentUserMiddleware } from "../middleware/current-user.middleware";
import { NewsletterModule } from "../newsletter/newsletter.module";

@Module({
  providers: [AuthService, SessionsService],
  controllers: [AuthController],
  imports: [
    GoogleModule,
    TypeOrmModule.forFeature([Session]),
    UsersModule,
    NewsletterModule,
  ],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes("*");
  }
}
