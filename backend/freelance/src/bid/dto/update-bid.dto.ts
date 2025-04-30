// src/bid/dto/update-bid.dto.ts
import { IsNumber, IsEnum, IsOptional } from 'class-validator';
import { BidStatus } from '../entities/bid.entity';

export class UpdateBidDto {
  @IsNumber()
  @IsOptional()
  initialAmount?: number;

  @IsNumber()
  @IsOptional()
  initialDurationDays?: number;

  @IsEnum(BidStatus)
  @IsOptional()
  status?: BidStatus;
}
