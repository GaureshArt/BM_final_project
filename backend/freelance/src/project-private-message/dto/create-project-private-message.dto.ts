export class CreateProjectPrivateMessageDto {
    senderId: number;
    receiverId: number;
    projectId: number;
    message: string;
    attachmentUrl?: string;
  }
  