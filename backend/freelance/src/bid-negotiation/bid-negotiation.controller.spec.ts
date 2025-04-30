import { Test, TestingModule } from '@nestjs/testing';
import { BidNegotiationController } from './bid-negotiation.controller';
import { BidNegotiationService } from './bid-negotiation.service';

describe('BidNegotiationController', () => {
  let controller: BidNegotiationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BidNegotiationController],
      providers: [BidNegotiationService],
    }).compile();

    controller = module.get<BidNegotiationController>(BidNegotiationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
