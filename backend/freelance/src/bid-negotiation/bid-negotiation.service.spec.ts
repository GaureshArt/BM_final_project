import { Test, TestingModule } from '@nestjs/testing';
import { BidNegotiationService } from './bid-negotiation.service';

describe('BidNegotiationService', () => {
  let service: BidNegotiationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BidNegotiationService],
    }).compile();

    service = module.get<BidNegotiationService>(BidNegotiationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
