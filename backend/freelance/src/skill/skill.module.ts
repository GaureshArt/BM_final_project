import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Skill } from './entities/skill.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Skill])],
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule {}
