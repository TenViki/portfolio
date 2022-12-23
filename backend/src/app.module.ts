import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpotifyModule } from "./spotify/spotify.module";

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
