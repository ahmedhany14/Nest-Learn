import {
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(
    @Inject()
    private readonly fileService: FileService,
  ) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return await this.fileService.uploadFileToS3(file);
  }
}
