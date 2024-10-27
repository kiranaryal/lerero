import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UnauthorizedException, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('v1/user')
export class UserController {
    constructor(private userService: UserService){}
    
    @Get()
    async getAllUsers(): Promise<User[]>{
        
        return this.userService.findAll()
    }

    @Post()
    @UseGuards(AuthGuard())

    async createUser(
        @Body() user: CreateUserDto,
        @Req() req 

    ): Promise<{ user: User }> { 
        if(req.user.profile != "board"){
            throw new UnauthorizedException('UnAuthorized User');
        }
        try {
            return await this.userService.create(user); 
        } catch (error) {
            if (error.name === 'ValidationError') {
                throw new UnprocessableEntityException('Data cannot be processed'); 
            }
            throw error; 
        }
    }
    @Put(':id')
    @UseGuards(AuthGuard())
    async updateUser(
        @Param('id')
        id:string,
        @Body() 
        user:UpdateUserDto,
        @Req() req 
    ): Promise<User>{
        if(req.user.profile != "expert"){
            throw new UnauthorizedException('UnAuthorized User');
        }
        try {
        return this.userService.updateById(id,user)

    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new UnprocessableEntityException('Data cannot be processed'); 
        }
        throw error; 
        }
    }
   
    @Get(':id')
    async getUser(
        @Param('id')
        id:string
    ): Promise<User>{
        return this.userService.findById(id)
        
    }
  
    @Delete(':id')
    async deleteUser(
        @Param('id')
        id:string
    ): Promise<User>{
        return this.userService.deleteById(id)
        
    }
}

@Controller('v1/auth')
export class AuthController{
    constructor(private userService: UserService){}
  

    @Post('login')
    async login(@Body() loginDto: loginDto): Promise<{ token: string; profile: string }> {
        try {
            const { token, profile } = await this.userService.login(loginDto);
            return { token, profile };
            
        } catch (error) {
           if (error instanceof UnauthorizedException) {
                throw error;
            }
            throw new UnauthorizedException('Invalid credentials');
        }
    }


    @Get('logout')
    @UseGuards(AuthGuard())

    async logout(@Req() req: Request, @Res() res: Response) {
        const token = req.headers['authorization']?.split(' ')[1];
        return res.status(200).json({ message: 'Logged out successfully' });
    }
}