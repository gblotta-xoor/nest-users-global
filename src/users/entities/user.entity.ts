import { Column, Entity, ObjectIdColumn, Unique } from 'typeorm';
import { Profile } from './profile.entity';
import { IsNumber } from 'class-validator';

@Entity()
export class User {
    @ObjectIdColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @IsNumber()
    @Column()
    age: number;

    @Column(() => Profile)
    profile: Profile;
}