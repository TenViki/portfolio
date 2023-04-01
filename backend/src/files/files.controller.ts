import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Response,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FilesService } from "./files.service";
import { AdminGuard } from "../guards/admin.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { access } from "fs/promises";
import { Response as Res } from "express";
import { createReadStream } from "fs";

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

  @Get("/:id/data")
  async getFileContents(
    @Param("id") id: string,
    @Response({ passthrough: true }) response: Res,
  ) {
    const file = await this.filesService.getFile(id);
    if (!file) throw new NotFoundException("File not found.");

    const path = (process.env.UPLOADS_PATH || "uploads") + "/" + file.path;

    try {
      await access(path);
    } catch (error) {
      throw new NotFoundException("File not found.");
    }

    response.set({
      "Content-Type": file.mimetype,
    });
    return new StreamableFile(createReadStream(path));
  }
}
