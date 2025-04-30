
import { IsDateString, IsDecimal, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateMilestoneDto {
  @IsNumber()
  @IsPositive()
  projectId: number;

  @IsNotEmpty()
  title: string;

  @IsDateString()
  dueDate: Date;

  @IsDecimal()
  amount: number;
}
