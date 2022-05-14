import { toISOString } from './date.util';

describe('DateUtil', () => {
  describe('toISOString', () => {
    it.each([
      ['2011-12-04', '2011-12-04T00:00:00.000Z'],
      ['2011-12-04T12:15:30.000+07:00', '2011-12-04T05:15:30.000Z'],
    ])('should transform date input %s to %s', (input, output) => {
      expect(toISOString(input)).toBe(output);
    });
  });
});
