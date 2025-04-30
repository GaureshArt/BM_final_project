import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectPrivateMessage } from './entities/project-private-message.entity';
import { Repository } from 'typeorm';
import { Project } from '../project/entities/project.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ProjectPrivateMessageService {
  constructor(
    @InjectRepository(ProjectPrivateMessage)
    private readonly messageRepo: Repository<ProjectPrivateMessage>,

    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async sendMessage(
    senderId: number,
    receiverId: number,
    projectId: number,
    message: string,
    attachmentUrl?: string,
  ) {
    const sender = await this.userRepo.findOne({ where: { id: senderId } });
    const receiver = await this.userRepo.findOne({ where: { id: receiverId } });
    const project = await this.projectRepo.findOne({ where: { id: projectId } });

    if (!sender || !receiver || !project)
      throw new NotFoundException('Sender, Receiver, or Project not found');

    const newMessage = this.messageRepo.create({
      sender,
      receiver,
      project,
      message,
      attachmentUrl,
    });

    return this.messageRepo.save(newMessage);
  }

  async getMessagesBetweenUsers(projectId: number, user1Id: number, user2Id: number) {
    return this.messageRepo.find({
      where: [
        {
          project: { id: projectId },
          sender: { id: user1Id },
          receiver: { id: user2Id },
        },
        {
          project: { id: projectId },
          sender: { id: user2Id },
          receiver: { id: user1Id },
        },
      ],
      order: { createdAt: 'ASC' },
      relations: ['sender', 'receiver'],
    });
  }

  async markAsRead(id: number) {
    const message = await this.messageRepo.findOne({ where: { id } });
    if (!message) throw new NotFoundException('Message not found');

    message.isRead = true;
    return this.messageRepo.save(message);
  }

  async updateMessage(id: number, newMessage: string, attachmentUrl?: string) {
    const message = await this.messageRepo.findOne({ where: { id } });
    if (!message) throw new NotFoundException('Message not found');

    message.message = newMessage;
    if(attachmentUrl)message.attachmentUrl = attachmentUrl;
    message.IsUpdated = true;
    return this.messageRepo.save(message);
  }

  async deleteMessage(id: number) {
    const result = await this.messageRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Message not found');
    return { message: 'Message deleted' };
  }
}
