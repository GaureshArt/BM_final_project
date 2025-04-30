// update-milestone.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateMilestoneDto } from './create-milestone.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateMilestoneDto extends PartialType(CreateMilestoneDto) {
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
