import { Transform, TransformFnParams } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class NewPostDto {
  @IsString()
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  content: string;

  @IsBoolean()
  published: boolean;

  @IsArray()
  tags: string[];

  @IsString()
  @IsOptional()
  bannerImageId: string;
}
