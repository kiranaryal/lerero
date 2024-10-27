import { Module } from '@nestjs/common';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillSchema } from './schemas/skill.schema';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{name:'Skill',schema: SkillSchema}])],
  controllers: [SkillController],
  providers: [SkillService],
  exports: [SkillService, MongooseModule], // Export MongooseModule if needed

})
export class SkillModule {}
