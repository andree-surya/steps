import { Time } from './time';

describe('Time', () => {
  describe('constructor', () => {
    it.each`
      input                              | expected
      ${'2011-12-04'}                    | ${'2011-12-04T00:00:00.000+00:00'}
      ${'2011-12-04T12:15:30.000+07:00'} | ${'2011-12-04T05:15:30.000+00:00'}
    `(
      'constructor with default UTC should transform time $input -> $expected',
      ({ input, expected }) => {
        expect(new Time(input).toISOString()).toBe(expected);
      },
    );

    it.each`
      input           | timezone          | expected
      ${'2011-12-04'} | ${'UTC'}          | ${'2011-12-04T00:00:00.000+00:00'}
      ${'2011-12-04'} | ${'Asia/Jakarta'} | ${'2011-12-04T00:00:00.000+07:00'}
    `(
      'constructor with timezone $timezone should transform time $input -> $expected',
      ({ input, timezone, expected }) => {
        expect(new Time(input, timezone).toISOString()).toBe(expected);
      },
    );
  });

  describe('startOf', () => {
    it.each`
      input                     | unitOfTime | timezone          | expected
      ${'2011-12-04T12:15:30Z'} | ${'day'}   | ${'UTC'}          | ${'2011-12-04T00:00:00.000+00:00'}
      ${'2011-12-03T23:59:59Z'} | ${'day'}   | ${'UTC'}          | ${'2011-12-03T00:00:00.000+00:00'}
      ${'2011-12-04T12:15:30Z'} | ${'hour'}  | ${'UTC'}          | ${'2011-12-04T12:00:00.000+00:00'}
      ${'2011-12-04T12:15:30Z'} | ${'day'}   | ${'Asia/Jakarta'} | ${'2011-12-04T00:00:00.000+07:00'}
      ${'2011-12-03T17:00:01Z'} | ${'day'}   | ${'Asia/Jakarta'} | ${'2011-12-04T00:00:00.000+07:00'}
      ${'2011-12-03T18:15:30Z'} | ${'hour'}  | ${'Asia/Jakarta'} | ${'2011-12-04T01:00:00.000+07:00'}
    `(
      'should get start of $unitOfTime of $input -> $expected ($timezone)',
      ({ input, unitOfTime, timezone, expected }) => {
        const time = new Time(input, timezone).startOf(unitOfTime);
        expect(time.toISOString()).toBe(expected);
      },
    );
  });

  describe('subtract', () => {
    it.each`
      input                     | amount | unitOfTime | expected
      ${'2011-12-04T12:15:30Z'} | ${3}   | ${'day'}   | ${'2011-12-01T12:15:30.000+00:00'}
      ${'2011-12-03T23:59:59Z'} | ${5}   | ${'day'}   | ${'2011-11-28T23:59:59.000+00:00'}
      ${'2011-12-04T12:15:30Z'} | ${1}   | ${'day'}   | ${'2011-12-03T12:15:30.000+00:00'}
      ${'2011-12-04T12:15:30Z'} | ${1}   | ${'hour'}  | ${'2011-12-04T11:15:30.000+00:00'}
      ${'2011-12-03T17:00:01Z'} | ${5}   | ${'hour'}  | ${'2011-12-03T12:00:01.000+00:00'}
      ${'2011-12-03T00:15:30Z'} | ${3}   | ${'hour'}  | ${'2011-12-02T21:15:30.000+00:00'}
    `(
      'should subtract $amount $unitOfTime from $input -> $expected',
      ({ input, amount, unitOfTime, expected }) => {
        const time = new Time(input).subtract(amount, unitOfTime);
        expect(time.toISOString()).toBe(expected);
      },
    );
  });

  describe('isBetween', () => {
    it.each`
      input                     | from                      | to                        | expected
      ${'2011-12-04T12:15:30Z'} | ${'2011-12-04T12:15:30Z'} | ${'2011-12-04T12:15:31Z'} | ${true}
      ${'2011-12-04T12:15:30Z'} | ${'2011-12-04T12:15:29Z'} | ${'2011-12-04T12:15:31Z'} | ${true}
      ${'2011-12-04T12:15:30Z'} | ${'2011-12-04T12:15:29Z'} | ${'2011-12-04T12:15:30Z'} | ${false}
      ${'2011-12-04T12:15:30Z'} | ${'2011-12-04T12:15:28Z'} | ${'2011-12-04T12:15:29Z'} | ${false}
    `(
      'should return $expected for $from <= $input <= $to',
      ({ input, from, to, expected }) => {
        const inputTime = new Time(input);
        const fromTime = new Time(from);
        const toTime = new Time(to);
        expect(inputTime.isBetween(fromTime, toTime)).toBe(expected);
      },
    );
  });
});
