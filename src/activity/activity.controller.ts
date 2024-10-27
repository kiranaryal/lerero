import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UnauthorizedException, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Activity } from './schemas/activity.schema';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('v1/activities')
export class ActivityController {
    constructor(private readonly activityService: ActivityService) {
    } 
   
    @Get()
    @UseGuards(AuthGuard())
    async getAllActivities(
        @Req() req,
        @Query('skill_id') skillId: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('sortBy') sortBy: string = 'startDate', // default sort by startDate
        @Query('order') order: 'asc' | 'desc' = 'asc' // default order ascending
    ): Promise<Activity[]> {
        try {

        const activities = await this.activityService.findAll({
            skillId,
            page,
            limit,
            sortBy,
            order
        });
        return activities;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new UnprocessableEntityException('Data cannot be processed'); 
        }
        throw error; 
    }
    }



    @Post()
    @UseGuards(AuthGuard())

    async createActivity( 
        @Body() activity: CreateActivityDto,
        @Req() req 
    ): Promise<Activity> {
        if(req.user.profile != "expert"){
            throw new UnauthorizedException('UnAuthorized User');
        }
        try {

        return this.activityService.create(activity);
    } catch (error) {
            throw new UnprocessableEntityException('Data cannot be processed'); 
    }
    }

    @Get(':id')
    async getActivity( 
        @Param('id') id: string,
    ): Promise<Activity> {
        return this.activityService.findById(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    async updateActivity( 
        @Param('id') id: string,
        @Body() activity: UpdateActivityDto,
        @Req() req 

    ): Promise<Activity> {
        if(req.user.profile != "expert"){
            throw new UnauthorizedException('UnAuthorized User');
        }
        try {

        return this.activityService.updateById(id, activity);
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new UnprocessableEntityException('Data cannot be processed'); 
        }
        throw error; 
    }
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteActivity( 
        @Param('id') id: string,
        @Req() req 
    ): Promise<Activity> {
        if(req.user.profile != "expert"){
            throw new UnauthorizedException('UnAuthorized User');
        }
        try {

        return this.activityService.deleteById(id);
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new UnprocessableEntityException('Data cannot be processed'); 
        }
        throw error; 
    }
    }
}
