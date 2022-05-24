import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Steps, StepsFilter } from './steps.model';
import { StepsService } from './steps.service';

@Controller('steps')
export class StepsController {
  constructor(private readonly stepsService: StepsService) {}

  @Post()
  async insert(@Body() steps: Steps): Promise<Steps> {
    return this.stepsService.upsert(randomUUID(), steps);
  }

  @Get()
  async get(@Query() stepsFilter: StepsFilter): Promise<Steps[]> {
    return this.stepsService.get(stepsFilter);
  }
}
