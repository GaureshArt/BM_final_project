import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateNotificationDto {
  @IsBoolean()
  @IsNotEmpty()
  isRead: boolean;
}
