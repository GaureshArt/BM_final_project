import { Module } from '@nestjs/common';
import { BidNegotiationService } from './bid-negotiation.service';
import { BidNegotiationController } from './bid-negotiation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { BidNegotiation } from './entities/bid-negotiation.entity';
import { Bid } from '../bid/entities/bid.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,BidNegotiation,Bid])],
  controllers: [BidNegotiationController],
  providers: [BidNegotiationService],
})
export class BidNegotiationModule {}
