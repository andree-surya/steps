import { Injectable } from '@nestjs/common';
import { Time } from '../common/time';
import { Steps } from './steps.model';

@Injectable()
export class StepsRepository {
  // Pretend in-memory database
  stepsDatabase: Map<string, Steps> = new Map();

  async upsert(id: string, steps: Steps): Promise<Steps> {
    this.stepsDatabase.set(id, steps);

    return steps;
  }

  async findAll(from: Time, to: Time): Promise<Steps[]> {
    return [...this.stepsDatabase.values()]
      .filter((steps) => {
        return new Time(steps.timestamp).isBetween(from, to);
      })
      .sort((stepsA, stepsB) =>
        stepsA.timestamp.localeCompare(stepsB.timestamp),
      );
  }
}
