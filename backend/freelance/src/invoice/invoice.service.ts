// src/invoice/invoice.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Milestone } from '../milestone/entities/milestone.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepo: Repository<Invoice>,
    @InjectRepository(Milestone)
    private milestoneRepo: Repository<Milestone>,
  ) {}

  async create(createDto: CreateInvoiceDto): Promise<Invoice> {
    const milestone = await this.milestoneRepo.findOne({ where: { id: createDto.milestoneId } });
    if (!milestone) throw new NotFoundException('Milestone not found');

    // Mark milestone as completed
    milestone.isCompleted = true;
    await this.milestoneRepo.save(milestone);

    const invoice = this.invoiceRepo.create({
      milestone,
      amount: createDto.amount,
    });

    return this.invoiceRepo.save(invoice);
  }

  async findOne(id: number): Promise<Invoice> {
    const invoice = await this.invoiceRepo.findOne({ where: { id }, relations: ['milestone'] });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }

  async update(id: number, updateDto: UpdateInvoiceDto): Promise<Invoice> {
    const invoice = await this.findOne(id);
    Object.assign(invoice, updateDto);
    return this.invoiceRepo.save(invoice);
  }
}
