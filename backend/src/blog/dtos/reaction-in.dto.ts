import { IsBoolean, IsOptional, IsString } from "class-validator";

export class ReactionInDto {
  @IsString()
  postId: string;

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
