import { Expose, Transform, Type } from "class-transformer";
import { UserLowDto } from "../../users/user-low.dto";
import { FileDto } from "../../files/dtos/file.dto";
import { getDescription } from "../../utils/blog";

export class ReactionsDto {
  @Expose()
  heart: number;

  @Expose()
  fire: number;

  @Expose()
  mindBlown: number;

  @Expose()
  rocket: number;

  @Expose()
  thumbsDown: number;
}

export class BlogPostListDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  slug: string;

  @Expose()
  createdAt: Date;

  @Expose()
  @Type(() => UserLowDto)
  author: UserLowDto;

  @Expose()
  @Type(() => TagDto)
  tags: TagDto[];

  @Expose()
  @Type(() => FileDto)
  banner: FileDto;

  @Expose()
  @Transform(({ value }) => getDescription(JSON.parse(value)))
  content: string;

  @Expose()
  @Type(() => ReactionsDto)
  publicReactions: ReactionsDto;

  @Expose()
  views: number;

  @Expose()
  comments: number;
}

export class UserReactionDto {
  @Expose()
  heart: boolean;

  @Expose()
  fire: boolean;

  @Expose()
  mindBlown: boolean;

  @Expose()
  rocket: boolean;

  @Expose()
  thumbsDown: boolean;
}

export class BlogPostDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  slug: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => UserLowDto)
  author: UserLowDto;

  @Expose()
  @Type(() => TagDto)
  tags: TagDto[];

  @Expose()
  @Type(() => FileDto)
  banner: FileDto;

  @Expose()
  @Type(() => ReactionsDto)
  publicReactions: ReactionsDto;

  @Expose()
  views: number;
}

export class TagDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  slug: string;

  @Expose()
  color: string;
}
