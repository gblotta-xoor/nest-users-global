import { Column } from 'typeorm';

export class Profile {
    @Column()
    code: number;

    @Column()
    name: string;
}