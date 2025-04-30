import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Milestone } from '../milestone/entities/milestone.entity';
import { Invoice } from './entities/invoice.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Milestone,Invoice])],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
