import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "./login.dto";
import { AuthService } from "./auth.service";
import { Serialize } from "../interceptors/serialize.interceptor";
import { AuthDto } from "./auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  @Serialize(AuthDto)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
