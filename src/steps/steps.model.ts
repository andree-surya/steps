import { IsISO8601, IsNumber, IsOptional, Min } from 'class-validator';

export class Steps {
  @IsNumber()
  @Min(0)
  count = 0;

  @IsISO8601({ strict: true })
  timestamp: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  duration = 0;
}
