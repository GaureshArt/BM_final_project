import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepo: Repository<Notification>,
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async create(dto: CreateNotificationDto): Promise<Notification> {
    const user = await this.userRepo.findOneBy({ id: dto.userId });
    if (!user) throw new NotFoundException('User not found');

    const notification = this.notificationRepo.create({
      user,
      data: dto.data,
    });

    return this.notificationRepo.save(notification);
  }

  async findAllForUser(userId: number): Promise<Notification[]> {
    return this.notificationRepo.find({
      where: {
        user: { id: userId },
        isRead: false,
      },
      order: { createdAt: 'DESC' },
    });
  }
  

  async markAsRead(id: number): Promise<Notification> {
    const notification = await this.notificationRepo.findOneBy({ id });
    if (!notification) throw new NotFoundException('Notification not found');

    notification.isRead = true;
    return this.notificationRepo.save(notification);
  }

  async delete(id: number): Promise<void> {
    const result = await this.notificationRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Notification not found');
    }
  }
}
