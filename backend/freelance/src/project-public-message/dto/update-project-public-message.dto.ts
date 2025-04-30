import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectPublicMessageDto } from './create-project-public-message.dto';

export class UpdateProjectPublicMessageDto extends PartialType(CreateProjectPublicMessageDto) {}
