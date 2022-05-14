import { Module } from '@nestjs/common';
import { StepsController } from './steps/steps.controller';
import { StepsService } from './steps/steps.service';

@Module({
  imports: [],
  controllers: [StepsController],
  providers: [StepsService],
})
export class AppModule {}
