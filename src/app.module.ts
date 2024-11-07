import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://blotin:XzoeUwBOKof3MA2I@cluster0.p49ri.mongodb.net/Cluster0?retryWrites=true&w=majority',
      synchronize: true, 
      entities: [User], 
      logging: true,
    }),
    UsersModule,
  ],
})
export class AppModule { }