import { Transform, TransformFnParams } from "class-transformer";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class NewPostDto {
  @IsString()
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  content: string;

  @IsString()
  published: boolean;

  @IsArray()
  tags: string[];
}
