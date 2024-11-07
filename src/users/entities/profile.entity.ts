import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class Profile {
    
    @ApiProperty({ example: '1234', description: 'Profile code' })
    @Column()
    code: number;

    @ApiProperty({ example: 'gb3245', description: 'User profile name' })
    @Column()
    name: string;
}