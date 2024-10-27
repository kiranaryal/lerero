import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
    timestamps:true
  })
@Schema()
export class Skill {
  @Prop({ required: true, unique: true })
  skill_name: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
