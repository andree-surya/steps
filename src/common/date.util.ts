import * as moment from 'moment';

export function toISOString(date: string) {
  return moment.utc(date).toISOString();
}
