import { Column, Entity, ObjectIdColumn, Unique } from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class User {
    @ObjectIdColumn()
    id: number;

    @Column()
    name: string;

    @Unique(['email'])
    @Column()
    email: string;

    @Column()
    age: number;

    @Column(() => Profile)
    profile: Profile
}