// src/bid-negotiation/bid-negotiation.controller.ts
import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { BidNegotiationService } from './bid-negotiation.service';
import { CreateBidNegotiationDto } from './dto/create-bid-negotiation.dto';

@Controller('bid-negotiations')
export class BidNegotiationController {
  constructor(private readonly bidNegotiationService: BidNegotiationService) {}

  // Create a new bid negotiation
  @Post()
  create(@Body() createBidNegotiationDto: CreateBidNegotiationDto) {
    return this.bidNegotiationService.create(createBidNegotiationDto);
  }

  // Get all bid negotiations for a bid
  @Get('bid/:bidId')
  findAllByBid(@Param('bidId') bidId: number) {
    return this.bidNegotiationService.findAllByBid(bidId);
  }
}
