import { IsEmail, IsNotEmpty } from "class-validator";
import { Profile } from "../entities/profile.entity";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    age: number;
    profile: Profile;
}