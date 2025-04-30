import { Test, TestingModule } from '@nestjs/testing';
import { ProjectPrivateMessageController } from './project-private-message.controller';
import { ProjectPrivateMessageService } from './project-private-message.service';

describe('ProjectPrivateMessageController', () => {
  let controller: ProjectPrivateMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectPrivateMessageController],
      providers: [ProjectPrivateMessageService],
    }).compile();

    controller = module.get<ProjectPrivateMessageController>(ProjectPrivateMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
