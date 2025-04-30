import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProjectPrivateMessageService } from './project-private-message.service';
import { CreateProjectPrivateMessageDto } from './dto/create-project-private-message.dto';
import { UpdateProjectPrivateMessageDto } from './dto/update-project-private-message.dto';

@Controller('project-private-message')
export class ProjectPrivateMessageController {
  constructor(private readonly service: ProjectPrivateMessageService) {}

  @Post()
  sendMessage(@Body() dto: CreateProjectPrivateMessageDto) {
    return this.service.sendMessage(dto.senderId, dto.receiverId, dto.projectId, dto.message, dto.attachmentUrl);
  }

  @Get(':projectId/:senderId/:receiverId')
  getConversation(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('senderId', ParseIntPipe) senderId: number,
    @Param('receiverId', ParseIntPipe) receiverId: number,
  ) {
    return this.service.getMessagesBetweenUsers(projectId, senderId, receiverId);
  }

  @Patch(':id/read')
  markAsRead(@Param('id', ParseIntPipe) id: number) {
    return this.service.markAsRead(id);
  }

  @Patch(':id')
  updateMessage(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProjectPrivateMessageDto,
  ) {
    return this.service.updateMessage(id, dto.message, dto.attachmentUrl);
  }

  @Delete(':id')
  deleteMessage(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteMessage(id);
  }
}
