import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProjectPublicMessageService } from './project-public-message.service';
import { CreateProjectPublicMessageDto } from './dto/create-project-public-message.dto';



@Controller('project-public-message')
export class ProjectPublicMessageController {
  constructor(private readonly messageService: ProjectPublicMessageService) {}

  @Post()
  createParent(
    @Param('projectId') projectId: number,
    @Body() dto: CreateProjectPublicMessageDto,
  ) {

    return this.messageService.createParentMessage(dto.userId, dto.projectId, dto.message, dto.attachmentUrl);
  }

  @Post(':parentMessageId/reply')
  reply(
    @Param('parentMessageId') parentMessageId: number,
    @Body() dto: CreateProjectPublicMessageDto,
  ) {
    
    return this.messageService.replyToMessage(dto.userId, parentMessageId, dto.message, dto.attachmentUrl);
  }

  @Get()
  getAllForProject(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.messageService.getMessagesByProject(projectId);
  }
}
