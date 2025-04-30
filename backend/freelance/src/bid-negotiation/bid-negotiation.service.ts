// src/bid-negotiation/bid-negotiation.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BidNegotiation } from './entities/bid-negotiation.entity';
import { Bid } from '../bid/entities/bid.entity';
import { User } from '../user/entities/user.entity';
import { CreateBidNegotiationDto } from './dto/create-bid-negotiation.dto';

@Injectable()
export class BidNegotiationService {
  constructor(
    @InjectRepository(BidNegotiation)
    private bidNegotiationRepo: Repository<BidNegotiation>,

    @InjectRepository(Bid)
    private bidRepo: Repository<Bid>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  // Create a new bid negotiation
  async create(createBidNegotiationDto: CreateBidNegotiationDto): Promise<BidNegotiation> {
    const bid = await this.bidRepo.findOne({ where: { id: createBidNegotiationDto.bidId } });
    if (!bid) throw new NotFoundException('Bid not found');

    const sender = await this.userRepo.findOne({ where: { id: createBidNegotiationDto.senderId } });
    if (!sender) throw new NotFoundException('User not found');

    const bidNegotiation = this.bidNegotiationRepo.create({
      bid,
      sender,
      proposedAmount: createBidNegotiationDto.proposedAmount,
      proposedDurationDays: createBidNegotiationDto.proposedDurationDays,
      message: createBidNegotiationDto.message,
    });

    // Save the negotiation and also add it to the bid's negotiations
    await this.bidNegotiationRepo.save(bidNegotiation);

    // Optionally, you can add this negotiation to the bid's negotiations array if you want it updated immediately
    bid.negotiations.push(bidNegotiation);
    await this.bidRepo.save(bid);

    return bidNegotiation;
  }

  // Get all negotiations for a bid
  async findAllByBid(bidId: number): Promise<BidNegotiation[]> {
    const bid = await this.bidRepo.findOne({
      where: { id: bidId },
      relations: ['negotiations'],
    });
    if (!bid) throw new NotFoundException('Bid not found');
    return bid.negotiations;
  }
}
