import { Module } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FilesController } from "./files.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileEntity } from "./file.entity";

@Module({
  providers: [FilesService],
  controllers: [FilesController],
  imports: [TypeOrmModule.forFeature([FileEntity])],
})
export class FilesModule {}
