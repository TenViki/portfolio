import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cors from "cors";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors("*"));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
