import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Skill } from 'src/skills/schemas/skill.schema';
import * as bcrypt from 'bcrypt';

export enum Profile{
  board='board',
  expert = 'expert',
  trainer='trainer',
  competitor = 'competitor'
}
@Schema({
  timestamps:true
})
@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true,select: false })
  password: string;

  @Prop()
  profile: Profile;

  @Prop({ type: String, default: null }) 
  skill?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
