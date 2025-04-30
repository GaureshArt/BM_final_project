import { Test, TestingModule } from '@nestjs/testing';
import { ProjectPublicMessageService } from './project-public-message.service';

describe('ProjectPublicMessageService', () => {
  let service: ProjectPublicMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectPublicMessageService],
    }).compile();

    service = module.get<ProjectPublicMessageService>(ProjectPublicMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
