import { IsString } from "class-validator";

export class NewTagDto {
  @IsString()
  name: string;

  @IsString()
  color: string;
}
