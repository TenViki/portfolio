import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpotifyModule } from "./spotify/spotify.module";
import { GoogleModule } from "./google/google.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { BlogModule } from "./blog/blog.module";
import { APP_PIPE } from "@nestjs/core";
import { ValidationPipeCheck } from "./interceptors/validation.pipe";
import { FilesModule } from "./files/files.module";
import { NewsletterModule } from "./newsletter/newsletter.module";
import { NewsletterRecord } from "./newsletter/newsletter.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configServce: ConfigService) => ({
        type: "postgres",
        host: "localhost",
        port: configServce.get("DB_PORT"),
        username: configServce.get("DB_USERNAME"),
        password: configServce.get("DB_PASSWORD"),
        database: configServce.get("DB_NAME"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: true,
      }),
    }),
    SpotifyModule,
    GoogleModule,
    AuthModule,
    UsersModule,
    BlogModule,
    FilesModule,
    NewsletterModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipeCheck({
        whitelist: true,
        stopAtFirstError: true,
      }),
    },
  ],
})
export class AppModule {}
