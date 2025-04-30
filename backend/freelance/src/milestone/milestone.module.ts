import { Module } from '@nestjs/common';
import { MilestoneService } from './milestone.service';
import { MilestoneController } from './milestone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Milestone } from './entities/milestone.entity';
import { Project } from '../project/entities/project.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Milestone,Project])],
  controllers: [MilestoneController],
  providers: [MilestoneService],
})
export class MilestoneModule {}
