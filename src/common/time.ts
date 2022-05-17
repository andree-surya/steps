import { Moment } from 'moment';
import * as moment from 'moment-timezone';

export class Time {
  private moment: Moment;

  constructor(time: string = new Date().toISOString(), timezone = 'UTC') {
    this.moment = moment.tz(time, timezone);
  }

  static timezones() {
    return moment.tz.names();
  }

  toISOString() {
    return this.moment.toISOString(true);
  }

  toDate() {
    return this.moment.toDate();
  }

  startOf(unitOfTime: UnitOfTime) {
    this.moment.startOf(unitOfTime);

    return this;
  }

  subtract(amount: number, unitOfTime: UnitOfTime) {
    this.moment.subtract(amount, unitOfTime);

    return this;
  }

  isBetween(from: Time, to: Time) {
    return this.moment.isBetween(from.moment, to.moment, undefined, '[)');
  }
}

export enum UnitOfTime {
  hour = 'hour',
  day = 'day',
}
