import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from './schemas/activity.schema'; 
import { SkillModule } from 'src/skill/skill.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Activity.name, schema: ActivitySchema }]),
    SkillModule, // Import the SkillModule here
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityService], 
})
export class ActivityModule {}

