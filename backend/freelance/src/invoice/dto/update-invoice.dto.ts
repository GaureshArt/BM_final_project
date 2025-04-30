
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateInvoiceDto {
  @IsBoolean()
  @IsOptional()
  isPaid?: boolean;
}
