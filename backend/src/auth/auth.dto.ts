import { Expose, Type } from "class-transformer";
import { UserDto } from "../users/user.dto";

export class AuthDto {
  @Type(() => UserDto)
  @Expose()
  user: UserDto;

  @Expose()
  token: string;
}
