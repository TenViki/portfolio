import { Expose } from "class-transformer";

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  picture: string;

  @Expose()
  name: string;

  @Expose()
  admin: boolean;
}
