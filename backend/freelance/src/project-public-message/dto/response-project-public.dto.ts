
import { IsString, IsOptional, IsBoolean, IsUrl, IsDateString, IsInt, IsDate } from 'class-validator';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/user/entities/user.entity';

export class ProjectPublicMessageResponseDto {
  @IsInt()
  id: number;  

  @IsInt()
  projectId: number;  

  @IsString()
  userId: string;  

  @IsString()
  message: string; 

  @IsOptional()
  @IsUrl()
  attachmentUrl?: string;  

  @IsBoolean()
  isParentMessage: boolean;  

  @IsOptional()
  @IsInt()
  parentMessageId?: string;  

  @IsBoolean()
  isUpdated: boolean;  

  @IsDate()
  createdAt: Date;  
  @IsOptional()
  project?: Project; 

  @IsOptional()
  user?: User; 
}
