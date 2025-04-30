import { Module } from '@nestjs/common';
import { BidService } from './bid.service';
import { BidController } from './bid.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from './entities/bid.entity';
import { User } from 'src/user/entities/user.entity';
import { Project } from 'src/project/entities/project.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Bid,User,Project])],
  controllers: [BidController],
  providers: [BidService],
})
export class BidModule {}
