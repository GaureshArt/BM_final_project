import { Test, TestingModule } from '@nestjs/testing';
import { ProjectPrivateMessageService } from './project-private-message.service';

describe('ProjectPrivateMessageService', () => {
  let service: ProjectPrivateMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectPrivateMessageService],
    }).compile();

    service = module.get<ProjectPrivateMessageService>(ProjectPrivateMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
