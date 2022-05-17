import { Injectable } from '@nestjs/common';
import { InjectModel, ModelDefinition } from '@nestjs/mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Time } from '../common/time';
import { Steps } from './steps.model';

const modelName = 'Steps';

@Injectable()
export class StepsRepository {
  constructor(@InjectModel(modelName) private steps: Model<StepsDocument>) {}

  async upsert(id: string, steps: Steps): Promise<Steps> {
    return this.steps.findOneAndUpdate(
      { id },
      { id, ...steps },
      {
        upsert: true,
      },
    );
  }

  async findAll(from: Time, to: Time): Promise<Steps[]> {
    return this.steps.find({
      timestamp: {
        $gte: from.toDate(),
        $lt: to.toDate(),
      },
    });
  }
}

@Schema({ _id: false })
class StepsDocument {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  count: number;

  @Prop({ required: true, index: true })
  timestamp: Date;
}

export const stepsModelDefinition: ModelDefinition = {
  name: modelName,
  schema: SchemaFactory.createForClass(StepsDocument),
};
