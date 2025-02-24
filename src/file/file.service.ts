import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { Express } from 'express';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { v4 as uuid4 } from 'uuid';
import { FileEntity } from './file.entity';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

interface fileUpload {
  name: string;
  paht: string;
  type: string;
  mime: string;
  size: number;
}

@Injectable()
export class FileService {
  constructor(
    @Inject()
    private readonly configService: ConfigService,
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}
  generateName(file: Express.Multer.File) {
    file.originalname = file.originalname.replace(' ', '_').trim();
    let name = file.originalname.split('.')[0];
    name.replace(/\s/g, '').trim();

    let extention = path.extname(file.originalname);

    let timestamp = new Date().getTime().toString().trim();

    return `${name}-${timestamp}-${uuid4()}${extention}`;
  }

  async toS3(file: Express.Multer.File) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get<string>('appConfig.awsBucketName'),
        Key: this.generateName(file),
        Body: file.buffer,
        ContentType: file.mimetype,
      })
      .promise();
    return uploadResult.Key;
  }


  

  
  async toDatabase(file: Express.Multer.File, name) {
    const fileUpload: fileUpload = {
      name: name,
      paht: `https://${this.configService.get<string>('appConfig.awsCloudFrontUrl')}/${name}`,
      type: 'image',
      mime: file.mimetype,
      size: file.size,
    };

    const newFile = this.fileRepository.create(fileUpload);
    return await this.fileRepository.save(newFile);
  }
  async uploadFileToS3(file: Express.Multer.File) {
    if (
      !['image/jpeg', 'image/png', 'image/gif', 'image/jpg'].includes(
        file.mimetype,
      )
    ) {
      throw new BadRequestException('Invalid file type');
    }
    // upload image to S3

    const s3Response = await this.toS3(file);
    // generate new instance in the database
    const dbResponse = await this.toDatabase(file, s3Response);

    return {
      s3Response,
      dbResponse,
    };
  }
}
