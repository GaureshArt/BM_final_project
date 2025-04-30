// src/upload/upload.controller.ts
import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('upload')
export class UploadController {
  constructor(private cloudinaryService: CloudinaryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body('type') type: 'image' | 'video' | 'raw' = 'image') {
    const result = await this.cloudinaryService.uploadFile(file, type);
    return { url: result.secure_url };
  }
}
