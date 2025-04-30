
import { IsNumber, IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { BidStatus } from '../entities/bid.entity';

export class CreateBidDto {
  @IsNumber()
  @IsNotEmpty()
  freelancerId: number;

  @IsNumber()
  @IsNotEmpty()
  projectId: number;

  @IsNumber()
  @IsNotEmpty()
  initialAmount: number;

  @IsNumber()
  @IsNotEmpty()
  initialDurationDays: number;

  @IsNumber()
  @IsNotEmpty()
  finalAmount?: number;

  @IsNumber()
  @IsNotEmpty()
  finalDurationDays?: number;

  @IsString()
  @IsNotEmpty()
  initialMessage: string;

  @IsEnum(BidStatus)
  @IsNotEmpty()
  status: BidStatus;
}
