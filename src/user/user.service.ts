import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';  
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './dto/login.dto';
@Injectable()
export class UserService {
    constructor(
        private jwtService : JwtService,
        @InjectModel(User.name)
        private userModel:mongoose.Model<User>,
    ){}
    async findAll():Promise<User[]> {
        const users = await this.userModel.find()
        return users
    }

    async create(CreateUserDto): Promise<{ user: User }> {
        const { name, username, email, password, profile, skill } = CreateUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await this.userModel.create({
            name, username, email, password: hashedPassword, profile, skill
        });
        return { user };  
    }
    

    async login(loginDto: loginDto): Promise<{ token: string; profile: string }> {
        const { username, password } = loginDto;
        const user = await this.userModel.findOne({ username }).select('+password');
        if(!user){
            throw new UnauthorizedException('Invalid login')
        }

        const isPasswordMatched = await bcrypt.compare(password,user.password)

        if(!isPasswordMatched){
            throw new UnauthorizedException('Invalid login')
        }
      
        const token= this.jwtService.sign({id:user._id})
        return { token, profile: user.profile }; // Return token and user profile
    }

    async findById(id:String): Promise<User>{
        const res = await this.userModel.findById(id)
        if(!res){
            throw new NotFoundException('User Not Found')
        }
        return res
    }
    async updateById(id:String,user: User): Promise<User>{
        const res = await this.userModel.findById(id, user,{
            new:true,
            runValidators:true,
        })
        if(!res){
            throw new NotFoundException('User Not Found')
        }
        return res
    }
    async deleteById(id:String): Promise<User>{
        
        return  await this.userModel.findByIdAndDelete(id);
    }
}