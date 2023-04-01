import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FilesService } from "./files.service";
import { AdminGuard } from "../guards/admin.guard";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("files")
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post("upload")
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.uploadAndSave(file);
  }

  @Get("/:id")
  getFile(@Param("id") id: string) {
    return this.filesService.getFile(id);
  }
}
