import { Expose } from "class-transformer";

export class UserLowDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  picture: string;
}
