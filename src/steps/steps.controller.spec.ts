import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { UnitOfTime } from '../common/time';
import { StepsController } from './steps.controller';
import { Steps, StepsFilter } from './steps.model';
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
      const response = insertSteps({
        timestamp: '2011-12-04T12:15:30.000+07:00',
        count: 5,
      });

      expect(response).toMatchObject({
        count: 5,
        timestamp: '2011-12-04T05:15:30.000+00:00',
      });
    });
  });

  describe('get', () => {
    it('should get aggregated steps by hour', () => {
      insertSteps({ timestamp: '2011-12-02T12:15:30.000+07:00', count: 2 });
      insertSteps({ timestamp: '2011-12-02T13:15:30.000+07:00', count: 7 });
      insertSteps({ timestamp: '2011-12-03T12:15:30.000+07:00', count: 3 });
      insertSteps({ timestamp: '2011-12-04T12:15:30.000+07:00', count: 5 });

      const response = getSteps({
        from: '2011-12-02',
        to: '2011-12-04',
      });

      expect(response).toMatchObject([
        { count: 2, timestamp: '2011-12-02T05:00:00.000+00:00' },
        { count: 7, timestamp: '2011-12-02T06:00:00.000+00:00' },
        { count: 3, timestamp: '2011-12-03T05:00:00.000+00:00' },
      ]);
    });

    it('should get aggregated steps by day', () => {
      insertSteps({ timestamp: '2011-12-02T12:15:30.000+07:00', count: 2 });
      insertSteps({ timestamp: '2011-12-02T13:15:30.000+07:00', count: 7 });
      insertSteps({ timestamp: '2011-12-03T12:15:30.000+07:00', count: 3 });
      insertSteps({ timestamp: '2011-12-04T12:15:30.000+07:00', count: 5 });

      const response = getSteps({
        from: '2011-12-02',
        to: '2011-12-04',
        granularity: UnitOfTime.day,
      });

      expect(response).toMatchObject([
        { count: 9, timestamp: '2011-12-02T00:00:00.000+00:00' },
        { count: 3, timestamp: '2011-12-03T00:00:00.000+00:00' },
      ]);
    });

    it('should consider timezone in steps aggregation', () => {
      insertSteps({ timestamp: '2011-12-02T12:15:30.000+07:00', count: 2 });
      insertSteps({ timestamp: '2011-12-02T13:15:30.000+07:00', count: 7 });
      insertSteps({ timestamp: '2011-12-03T12:15:30.000+07:00', count: 3 });
      insertSteps({ timestamp: '2011-12-04T12:15:30.000+07:00', count: 5 });

      const response = getSteps({
        from: '2011-12-02',
        to: '2011-12-04',
        timezone: 'Asia/Jakarta',
      });

      expect(response).toMatchObject([
        { count: 2, timestamp: '2011-12-02T12:00:00.000+07:00' },
        { count: 7, timestamp: '2011-12-02T13:00:00.000+07:00' },
        { count: 3, timestamp: '2011-12-03T12:00:00.000+07:00' },
      ]);
    });
  });

  function insertSteps(steps: Steps) {
    return stepsController.upsert(randomUUID(), steps);
  }

  function getSteps(stepsFilter: Partial<StepsFilter>) {
    return stepsController.get(stepsFilter as any);
  }
});
