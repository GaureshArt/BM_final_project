import { Test, TestingModule } from '@nestjs/testing';
import { ProjectPublicMessageController } from './project-public-message.controller';
import { ProjectPublicMessageService } from './project-public-message.service';

describe('ProjectPublicMessageController', () => {
  let controller: ProjectPublicMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectPublicMessageController],
      providers: [ProjectPublicMessageService],
    }).compile();

    controller = module.get<ProjectPublicMessageController>(ProjectPublicMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
