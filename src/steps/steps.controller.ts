import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { Steps, StepsFilter } from './steps.model';
import { StepsService } from './steps.service';

@Controller('steps')
export class StepsController {
  constructor(private readonly stepsService: StepsService) {}

  @Put(':id')
  upsert(@Param('id') id: string, @Body() steps: Steps): Steps {
    return this.stepsService.upsert(id, steps);
  }

  @Get()
  get(@Query() stepsFilter: StepsFilter): Steps[] {
    return this.stepsService.get(stepsFilter);
  }
}
