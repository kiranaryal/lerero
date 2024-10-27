import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';  
import { Activity } from './schemas/activity.schema';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Skill } from 'src/skill/schemas/skill.schema';

@Injectable()
export class ActivityService {
    constructor(
        @InjectModel(Activity.name)
        private activityModel: mongoose.Model<Activity> ,

        @InjectModel(Skill.name) // Inject the Skill model
        private skillModel: mongoose.Model<Skill>

    ) {}

        async findAll({ skillId, page, limit, sortBy, order }): Promise<Activity[]> {
            const query = skillId ? { skill: skillId } : {};
            const sortOrder = order === 'asc' ? 1 : -1;
    
            return this.activityModel
                .find(query)
                .sort({ [sortBy]: sortOrder })
                .skip((page - 1) * limit)
                .limit(limit)
                .populate('participants')
                .exec();
        }
        async create(activityDto: CreateActivityDto): Promise<Activity> {
            // Validate the skill exists
            const skillExists = await this.skillModel.findById(activityDto.skill).exec();
            if (!skillExists) {
                throw new NotFoundException('Skill Not Found');
            }
        
            return await this.activityModel.create(activityDto);
        }
        

    async findById(id: string): Promise<Activity> {
        const res = await this.activityModel.findById(id).exec(); 
        if (!res) {
            throw new NotFoundException('Activity Not Found');
        }
        return res;
    }

    async updateById(id: string, updateActivityDto: UpdateActivityDto): Promise<Activity> {
        const activity = await this.activityModel.findById(id).lean().exec(); // Use lean to get a plain object
    
        if (!activity) {
            throw new NotFoundException('Activity Not Found');
        }
    
        const updatedActivity = { ...activity, ...updateActivityDto }; // No toObject needed
    
        const res = await this.activityModel.findByIdAndUpdate(
            id,
            updatedActivity,
            {
                new: true,
                runValidators: true,
            }
        ).exec();
    
        if (!res) {
            throw new NotFoundException('Activity Not Found');
        }
        return res;
    }
    

    async deleteById(id: string): Promise<Activity> {
        const res = await this.activityModel.findByIdAndDelete(id).exec(); 
        if (!res) {
            throw new NotFoundException('Activity Not Found'); 
        }
        return res;
    }
}
