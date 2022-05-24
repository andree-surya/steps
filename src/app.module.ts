import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './common/config';
import { StepsController } from './steps/steps.controller';
import { StepsRepository } from './steps/steps.repository';
import { StepsService } from './steps/steps.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  controllers: [StepsController],
  providers: [StepsService, StepsRepository],
})
export class AppModule {}
