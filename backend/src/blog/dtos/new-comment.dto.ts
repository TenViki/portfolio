import { IsOptional, IsString, MinLength } from "class-validator";

export class NewCommentDto {
  @IsString()
  @MinLength(1)
  content: string;

  @IsString()
  postId: string;

  @IsString()
  @IsOptional()
  parentCommentId?: string;
}
