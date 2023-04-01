import { Expose, Type } from "class-transformer";
import { UserLowDto } from "../../users/user-low.dto";
import { FileDto } from "../../files/dtos/file.dto";

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
}

export class TagDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  color: string;
}
