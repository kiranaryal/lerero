import { Profile } from "../schemas/user.schema"
import { Exclude } from 'class-transformer';


export class UpdateUserDto{
    readonly name:string
    readonly username:string
    readonly email:string   
    readonly profile:Profile
    @Exclude() 
    readonly password: string; 
  
}