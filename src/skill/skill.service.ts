import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Skill } from './schemas/skill.schema';

@Injectable()
export class SkillService {
    constructor(
        @InjectModel(Skill.name)
        private skillModel:mongoose.Model<Skill>
    ){}
    async findAll():Promise<Skill[]>{
        const skills = await this.skillModel.find()
        return skills
    }
    async create(skill:Skill): Promise<Skill>{
        const res = await this.skillModel.create(skill)
        return res
    }
}
