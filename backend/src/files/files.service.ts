import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileEntity } from "./file.entity";
import { Repository } from "typeorm";

import * as fs from "fs/promises";
import * as sharp from "sharp";

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private filesRepository: Repository<FileEntity>,
  ) {}

  async uploadAndSave(file: Express.Multer.File) {
    const saveFileTo = process.env.UPLOADS_PATH;

    // Save file to disk
    const uniqueFilename = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;

    let buffer = file.buffer;

    if (file.mimetype.startsWith("image/")) {
      buffer = await sharp(file.buffer)
        .withMetadata()
        .resize({
          width: 1920,
          height: 1080,
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({ quality: 80 })
        .toBuffer();
    }

    await fs.writeFile(`${saveFileTo}/${uniqueFilename}`, buffer);

    const fileEntity = this.filesRepository.create({
      filename: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      path: uniqueFilename,
    });

    return this.filesRepository.save(fileEntity);
  }

  async getFile(id: string) {
    const fileData = await this.filesRepository.findOne({ where: { id } });
    if (!fileData) throw new NotFoundException("File not found");
    return fileData;
  }
}
