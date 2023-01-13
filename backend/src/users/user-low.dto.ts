import { Expose } from "class-transformer";

export class UserLowDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  picture: string;
}
