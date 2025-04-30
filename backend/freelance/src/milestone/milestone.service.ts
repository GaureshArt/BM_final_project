import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Milestone } from './entities/milestone.entity';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { UpdateMilestoneDto } from './dto/update-milestone.dto';
import { Project } from '../project/entities/project.entity';

@Injectable()
export class MilestoneService {
  constructor(
    @InjectRepository(Milestone)
    private milestoneRepo: Repository<Milestone>,

    @InjectRepository(Project)
    private projectRepo: Repository<Project>
  ) {}

  async create(dto: CreateMilestoneDto): Promise<Milestone> {
    const project = await this.projectRepo.findOne({ where: { id: dto.projectId } });
    if (!project) throw new NotFoundException('Project not found');

    const milestone = this.milestoneRepo.create({
      ...dto,
      project,
    });

    return this.milestoneRepo.save(milestone);
  }

  findAll(): Promise<Milestone[]> {
    return this.milestoneRepo.find({
      relations: ['project'],
      order: { dueDate: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Milestone> {
    const milestone = await this.milestoneRepo.findOne({
      where: { id },
      relations: ['project'],
    });
    if (!milestone) throw new NotFoundException('Milestone not found');
    return milestone;
  }

  async update(id: number, dto: UpdateMilestoneDto): Promise<Milestone> {
    const milestone = await this.findOne(id);
    Object.assign(milestone, dto);
    return this.milestoneRepo.save(milestone);
  }

  async remove(id: number): Promise<void> {
    const milestone = await this.findOne(id);
    await this.milestoneRepo.remove(milestone);
  }

  async findByProject(projectId: number): Promise<Milestone[]> {
    return await this.milestoneRepo.find({
      where: { project: { id: projectId } },
      order: { dueDate: 'ASC' },
    });
  }
}
