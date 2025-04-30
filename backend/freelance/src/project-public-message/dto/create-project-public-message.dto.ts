import { IsString, IsOptional, IsBoolean, IsUrl, IsInt, IsUUID } from 'class-validator';

export class CreateProjectPublicMessageDto {
  @IsInt()
  projectId: number; 
  @IsInt()
  userId: number;  
  @IsString()
  message: string;  

  @IsOptional()
  @IsUrl()
  attachmentUrl?: string;  

  @IsBoolean()
  isParentMessage: boolean; 

  @IsOptional()
  @IsInt()
  parentMessageId?: number;  

  @IsOptional()
  @IsBoolean()
  isUpdated?: boolean;  
}
