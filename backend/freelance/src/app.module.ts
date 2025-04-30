import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from 'config/configDB';
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';

import { ProjectModule } from './project/project.module';

import { BidModule } from './bid/bid.module';
import { CategoryModule } from './category/category.module';
import { BidNegotiationModule } from './bid-negotiation/bid-negotiation.module';
import { MilestoneModule } from './milestone/milestone.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ProjectPublicMessageModule } from './project-public-message/project-public-message.module';
import { ProjectPrivateMessageModule } from './project-private-message/project-private-message.module';
import { NotificationModule } from './notification/notification.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GlobalJwtModule } from './auth/jwt.module';

import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: '.env',
  }),GlobalJwtModule
  ,TypeOrmModule.forRoot(dbConfig), UserModule, SkillModule, ProjectModule, BidModule, CategoryModule, BidNegotiationModule, MilestoneModule, InvoiceModule, ProjectPublicMessageModule, ProjectPrivateMessageModule, NotificationModule, AuthModule,  CloudinaryModule,
  MulterModule.register({
    storage:diskStorage({
      destination:'./uploads',
      filename:(req,file,cb)=>{
        const fileExt = extname(file.originalname);
        const custName = `fakeText${fileExt}`
        cb(null,custName);
      }
    })
  })],
  controllers: [AppController],
  providers: [AppService],
  exports:[]
})
export class AppModule {}
