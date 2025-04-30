import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SkillModule } from 'src/skill/skill.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from 'src/skill/entities/skill.entity';
import { User } from './entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports:[SkillModule,TypeOrmModule.forFeature([Skill,User]),JwtModule,CloudinaryModule],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
