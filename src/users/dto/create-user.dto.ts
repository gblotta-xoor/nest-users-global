import { IsEmail, IsNotEmpty } from "class-validator";
import { Profile } from "../entities/profile.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @IsNotEmpty()
    @ApiProperty({ example: 'John Doe', description: 'User name', required: true })
    name: string;
    
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'test@mail.com', description: 'User email', required: true })
    email: string;
    
    @ApiProperty({ example: 20, description: 'User age' })
    age: number;
    
    @ApiProperty({ example: {
        name: 'John Doe',
        code: '1234'
    }, description: 'User profile information' })
    profile: Profile;
}