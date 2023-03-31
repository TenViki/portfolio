import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileEntity } from "./file.entity";
import { Repository } from "typeorm";

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private filesRepository: Repository<FileEntity>,
  ) {}
}
