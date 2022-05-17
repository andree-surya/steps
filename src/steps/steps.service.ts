import { Injectable, Logger } from '@nestjs/common';
import { Time, UnitOfTime } from '../common/time';
import { Steps, StepsFilter } from './steps.model';
import { StepsRepository } from './steps.repository';

@Injectable()
export class StepsService {
  private readonly logger = new Logger(StepsService.name);
  constructor(private readonly stepsRepository: StepsRepository) {}

  async upsert(id: string, steps: Steps): Promise<Steps> {
    steps.timestamp = new Time(steps.timestamp).toISOString();

    await this.stepsRepository.upsert(id, steps);
    this.logger.log(`Steps upserted; ${id} ${steps.timestamp} ${steps.count}`);

    return steps;
  }

  async get(stepsFilter: StepsFilter): Promise<Steps[]> {
    stepsFilter.timezone ||= 'UTC';
    stepsFilter.granularity ||= UnitOfTime.hour;

    const stepsCounter = new Map<string, number>();
    const fromTime = new Time(stepsFilter.from, stepsFilter.timezone);
    const toTime = new Time(stepsFilter.to, stepsFilter.timezone);

    const stepRecords = await this.stepsRepository.findAll(fromTime, toTime);

    for (const steps of stepRecords) {
      const time = new Time(steps.timestamp, stepsFilter.timezone);
      const timeBucket = time.startOf(stepsFilter.granularity).toISOString();

      const currentCount = stepsCounter.get(timeBucket) || 0;
      stepsCounter.set(timeBucket, currentCount + steps.count);
    }

    return [...stepsCounter.entries()].sort().map(([timestamp, count]) => {
      return { count, timestamp };
    });
  }
}
