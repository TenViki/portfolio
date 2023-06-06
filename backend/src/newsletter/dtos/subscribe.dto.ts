import { IsEmail, IsIn, IsString, MinLength } from "class-validator";

export class SubscribeDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @IsIn(["en", "cs"])
  language: string;
}
