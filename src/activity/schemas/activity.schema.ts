import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type ActivityDocument = Activity & Document;
@Schema({
  timestamps:true
})
@Schema()
export class Activity {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true })
  skill: mongoose.Schema.Types.ObjectId; 

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({
    required: true,
    validate: {
      validator: function (this: Activity) {
        return this.endDate > this.startDate; 
      },
      message: 'End date must be greater than start date.',
    },
  })
  endDate: Date;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    required: true,
  })
  participants: mongoose.Schema.Types.ObjectId[]; 
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
