import {
  IsEnum,
  IsIn,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { Time, UnitOfTime } from '../common/time';

export class Steps {
  @IsNumber()
  @Min(1)
  count = 0;

  @IsOptional()
  @IsISO8601({ strict: true })
  timestamp = new Time().toISOString();
}

export class StepsFilter {
  @IsNotEmpty()
  @IsISO8601({ strict: true })
  to: string;

  @IsNotEmpty()
  @IsISO8601({ strict: true })
  from: string;

  @IsOptional()
  @IsEnum(UnitOfTime)
  granularity?: UnitOfTime;

  @IsOptional()
  @IsIn(Time.timezones())
  timezone?: string;
}
