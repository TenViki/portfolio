import { IsString, MinLength } from "class-validator";

export class NewTagDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  color: string;
}
