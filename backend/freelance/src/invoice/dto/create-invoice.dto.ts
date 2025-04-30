
import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateInvoiceDto {
  @IsNumber()
  @IsNotEmpty()
  milestoneId: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
