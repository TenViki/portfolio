import { Expose, Type } from "class-transformer";
import { UserLowDto } from "../../users/user-low.dto";

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
}
