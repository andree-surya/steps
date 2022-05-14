import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Steps } from './steps.model';

describe('Steps', () => {
  it.each([
    { count: 50, timestamp: '2011-12-32' }, // Not valid date
    { count: 50, timestamp: 'something' }, // Not valid date
    { count: 50 }, // Missing timestamp
    { count: -1, timestamp: '2011-12-04T12:15:30.000+07:00' }, // Not valid positive number
  ])('should reject invalid value %p', (value) => {
    const steps = plainToInstance(Steps, value);
    const errors = validateSync(steps);

    expect(errors).toHaveLength(1);
  });

  it.each([
    { count: 50, timestamp: '2011-12-31' },
    { count: 50, timestamp: '2011-12-04T12:15:30.000+07:00' },
    { count: 50, timestamp: '2011-12-04T12:15:30Z' },
    { count: 0, timestamp: '2011-12-04T12:15:30Z' },
    { count: 0, timestamp: '2011-12-04T12:15:30Z', duration: 0 },
  ])('should accept valid value: %p', (value) => {
    const steps = plainToInstance(Steps, value);
    const errors = validateSync(steps);

    expect(errors).toHaveLength(0);
  });
});
