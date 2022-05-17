import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from './common/config';
import { StepsController } from './steps/steps.controller';
import {
  stepsModelDefinition,
  StepsRepository,
} from './steps/steps.repository';
import { StepsService } from './steps/steps.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongo.url'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([stepsModelDefinition]),
  ],
  controllers: [StepsController],
  providers: [StepsService, StepsRepository],
})
export class AppModule {}

MongooseModule.forFeature;
