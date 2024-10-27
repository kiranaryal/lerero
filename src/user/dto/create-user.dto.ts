import { Profile } from "../schemas/user.schema"
import { Exclude } from 'class-transformer';
import { IsMongoId } from "class-validator";
import { ObjectId } from 'mongoose';


export class CreateUserDto{
    readonly name:string
    readonly username:string
    readonly email:string   
    readonly profile:Profile
    @IsMongoId()
    readonly skill: ObjectId;  // Change to ObjectId
    @Exclude() 
    readonly password: string; 
  
}