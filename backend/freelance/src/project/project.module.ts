import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { User } from '../user/entities/user.entity';
import { Category } from '../category/entities/category.entity';
import { Bid } from '../bid/entities/bid.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Project,User,Category,Bid])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
