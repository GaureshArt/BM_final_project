import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: 'dvacmvrws',
      api_key: '885843339691187',
      api_secret: 'PoOSMQ_u0DiUjVQ-ijugoJShUJA',
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    resource_type: 'image' | 'raw' | 'video' = 'image',
  ): Promise<UploadApiResponse> {

    console.log("Tjis is file ",file.filename)
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type },
        (error, result) => {
          if (error) return reject(error);
          resolve(result as UploadApiResponse);
        },
      );

      Readable.from(file.buffer).pipe(uploadStream);
    });
  }
}
