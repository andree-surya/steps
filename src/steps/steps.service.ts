import { Injectable, Logger } from '@nestjs/common';
import { Time, UnitOfTime } from '../common/time';
import { Steps, StepsFilter } from './steps.model';

@Injectable()
export class StepsService {
  private readonly logger = new Logger(StepsService.name);
  private readonly stepsDatabase = new Map<string, Steps>();

  upsert(id: string, steps: Steps): Steps {
    steps.timestamp = new Time(steps.timestamp).toISOString();

    this.stepsDatabase.set(id, steps);
    this.logger.log(`Steps upserted; ${id} ${steps.timestamp} ${steps.count}`);

    return steps;
  }

  get(stepsFilter: StepsFilter): Steps[] {
    stepsFilter.timezone ||= 'UTC';
    stepsFilter.granularity ||= UnitOfTime.hour;

    const stepsCounter = new Map<string, number>();
    const fromTime = new Time(stepsFilter.from, stepsFilter.timezone);
    const toTime = new Time(stepsFilter.to, stepsFilter.timezone);

    for (const steps of this.stepsDatabase.values()) {
      const time = new Time(steps.timestamp, stepsFilter.timezone);

      if (time.isBetween(fromTime, toTime)) {
        const timeBucket = time.startOf(stepsFilter.granularity).toISOString();

        const currentCount = stepsCounter.get(timeBucket) || 0;
        stepsCounter.set(timeBucket, currentCount + steps.count);
      }
    }

    return [...stepsCounter.entries()].sort().map(([timestamp, count]) => {
      return { count, timestamp };
    });
  }
}
