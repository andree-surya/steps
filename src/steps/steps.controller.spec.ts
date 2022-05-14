import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { StepsController } from './steps.controller';
import { Steps } from './steps.model';
import { StepsService } from './steps.service';

describe('StepsController', () => {
  let stepsController: StepsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StepsController],
      providers: [StepsService],
    }).compile();

    stepsController = app.get<StepsController>(StepsController);
  });

  describe('upsert', () => {
    it('should successfully insert steps', () => {
      const id = randomUUID();
      const steps: Steps = new Steps();

      steps.count = 5;
      steps.timestamp = '2011-12-04T12:15:30.000+07:00';

      expect(stepsController.upsert(id, steps)).toMatchObject({
        count: 5,
        timestamp: '2011-12-04T05:15:30.000Z',
        duration: 0,
      });
    });
  });
});
