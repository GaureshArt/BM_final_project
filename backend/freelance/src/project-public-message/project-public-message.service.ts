import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectPublicMessageDto } from './dto/create-project-public-message.dto';
import { UpdateProjectPublicMessageDto } from './dto/update-project-public-message.dto';
import { Project } from '../project/entities/project.entity';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectPublicMessage } from './entities/project-public-message.entity';

@Injectable()
export class ProjectPublicMessageService {
  
  constructor(
    @InjectRepository(ProjectPublicMessage)
    private readonly messageRepo: Repository<ProjectPublicMessage>,

    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createParentMessage(userId: number, projectId: number, message: string, attachmentUrl?: string) {
    const project = await this.projectRepo.findOne({ where: { id: projectId } });
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!project || !user) throw new NotFoundException('Project or User not found');

    const newMessage = this.messageRepo.create({
      project,
      user,
      message,
      attachmentUrl,
      isParentMessage: true,
    });

    return this.messageRepo.save(newMessage);
  }

  async replyToMessage(userId: number, parentMessageId: number, message: string, attachmentUrl?: string) {
    const parentMessage = await this.messageRepo.findOne({
      where: { id: parentMessageId },
      relations: ['project'],
    });

    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!parentMessage || !user) throw new NotFoundException('Parent message or User not found');

    const reply = this.messageRepo.create({
      project: parentMessage.project,
      user,
      message,
      attachmentUrl,
      isParentMessage: false,
      parentMessage,
    });

    return this.messageRepo.save(reply);
  }

  async getMessagesByProject(projectId: number) {
    return this.messageRepo.find({
      where: {
        project: { id: projectId },
        isParentMessage: true,
      },
      relations: ['user', 'childMessages', 'childMessages.user'],
      order: {
        createdAt: 'ASC',
      },
    });
  }
}
