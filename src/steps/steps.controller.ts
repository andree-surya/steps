import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { Steps } from './steps.model';
import { StepsService } from './steps.service';

@Controller('steps')
export class StepsController {
  constructor(private readonly stepsService: StepsService) {}

  @Put(':id')
  upsert(@Param('id') id: string, @Body() steps: Steps): Steps {
    return this.stepsService.upsert(id, steps);
  }
}
