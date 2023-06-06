import { IsArray, IsString, MinLength } from "class-validator";

export class UpdatePreferencesDto {
  @IsArray()
  preferences: string[];

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  language: string;
}
