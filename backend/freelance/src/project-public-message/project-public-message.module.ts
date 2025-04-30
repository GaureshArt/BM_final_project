import { Module } from '@nestjs/common';
import { ProjectPublicMessageService } from './project-public-message.service';
import { ProjectPublicMessageController } from './project-public-message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Project } from '../project/entities/project.entity';
import { ProjectPublicMessage } from './entities/project-public-message.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Project,ProjectPublicMessage])],
  controllers: [ProjectPublicMessageController],
  providers: [ProjectPublicMessageService],
})
export class ProjectPublicMessageModule {}
