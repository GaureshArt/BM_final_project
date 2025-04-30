// src/bid/bid.controller.ts
import { Controller, Post, Body, Param, Patch, Delete, Get, ParseIntPipe } from '@nestjs/common';
import { BidService } from './bid.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';

@Controller('bids')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @Post()
  create(@Body() createBidDto: CreateBidDto) {
    return this.bidService.create(createBidDto);
  }

 @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateBidDto: UpdateBidDto) {
    return this.bidService.update(id, updateBidDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bidService.remove(id);
  }


  @Get('project/:projectId')
  findAllByProject(@Param('projectId') projectId: number) {
    return this.bidService.findAllByProject(projectId);
  }

  @Get('userId/:id')
  findProjects(@Param('id',ParseIntPipe) id: number) {
    return this.bidService.findProjects(id);
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bidService.findOne(id);
  }
}
