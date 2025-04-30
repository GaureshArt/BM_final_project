
import { IsNumber, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateBidNegotiationDto {
  @IsNumber()
  bidId: number;

  @IsNumber()
  senderId: number;

  @IsOptional()
  @IsNumber()
  proposedAmount?: number;

  @IsOptional()
  @IsInt()
  proposedDurationDays?: number;

  @IsString()
  @IsOptional()
  message?: string;
}
