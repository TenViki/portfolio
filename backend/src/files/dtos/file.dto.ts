import { Expose } from "class-transformer";

export class FileDto {
  @Expose()
  id: string;

  @Expose()
  filename: string;

  @Expose()
  mimetype: string;

  @Expose()
  path: string;

  @Expose()
  size: number;
}
