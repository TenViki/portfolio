import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileEntity } from "./file.entity";
import { Repository } from "typeorm";

import * as fs from "fs/promises";

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

    await fs.writeFile(`${saveFileTo}/${uniqueFilename}`, file.buffer);

    const fileEntity = this.filesRepository.create({
      filename: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      path: `${saveFileTo}/${uniqueFilename}`,
    });

    return this.filesRepository.save(fileEntity);
  }

  async getFile(id: string) {
    const fileData = await this.filesRepository.findOne({ where: { id } });
    if (!fileData) throw new NotFoundException("File not found");
    return fileData;
  }
}
