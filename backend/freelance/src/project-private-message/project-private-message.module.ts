import { Module } from '@nestjs/common';
import { ProjectPrivateMessageService } from './project-private-message.service';
import { ProjectPrivateMessageController } from './project-private-message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectPrivateMessage } from './entities/project-private-message.entity';
import { Project } from '../project/entities/project.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProjectPrivateMessage,Project,User])],
  controllers: [ProjectPrivateMessageController],
  providers: [ProjectPrivateMessageService],
})
export class ProjectPrivateMessageModule {}
