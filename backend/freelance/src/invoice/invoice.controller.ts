// src/invoice/invoice.controller.ts
import { Controller, Post, Body, Param, Get, Patch, ParseIntPipe } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  create(@Body() dto: CreateInvoiceDto) {
    return this.invoiceService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.invoiceService.findOne(id);
  }


}
