import { Injectable } from '@nestjs/common';
import { toISOString } from '../common/date.util';
import { Steps } from './steps.model';

const stepsDatabase: Map<string, Steps> = new Map();

@Injectable()
export class StepsService {
  upsert(id: string, steps: Steps): Steps {
    steps.timestamp = toISOString(steps.timestamp);

    stepsDatabase.set(id, steps);

    return steps;
  }
}
