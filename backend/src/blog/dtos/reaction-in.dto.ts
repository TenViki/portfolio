import { IsBoolean, IsOptional, IsString } from "class-validator";

export class ReactionInDto {
  @IsString()
  @IsOptional()
  postId: string;

  @IsString()
  @IsOptional()
  commentId: string;

  @IsBoolean()
  heart: boolean;

  @IsBoolean()
  fire: boolean;

  @IsBoolean()
  mindBlown: boolean;

  @IsBoolean()
  rocket: boolean;

  @IsBoolean()
  thumbsDown: boolean;
}
