import { Controller, Get ,Post , Body, UseGuards } from '@nestjs/common';
import { SkillService } from './skill.service';
import { Skill } from './schemas/skill.schema';
import { CreateSkillDto } from './dto/create-skill.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('v1/skills')
export class SkillController {
    constructor(private skillService:SkillService){}
    @Get()
    @UseGuards(AuthGuard())
    async getAllSkills(): Promise<Skill[]>{
        return this.skillService.findAll()
    }

  @Post()
    async createSkill(
        @Body() 
        skill:CreateSkillDto,
    ): Promise<Skill>{
        return this.skillService.create(skill)
    }
}
