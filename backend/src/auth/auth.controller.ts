import { Body, Controller, Get, Post } from "@nestjs/common";
import { LoginDto } from "./login.dto";
import { AuthService } from "./auth.service";
import { Serialize } from "../interceptors/serialize.interceptor";
import { AuthDto } from "./auth.dto";
import { UserDto } from "../users/user.dto";
import { CurrentUser } from "../middleware/current-user.middleware";
import { User } from "../users/users.entity";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  @Serialize(AuthDto)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get("/me")
  @Serialize(UserDto)
  getMe(@CurrentUser() user: User) {
    return user;
  }
}
