import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Category } from '../category/entities/category.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,

    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(dto: CreateProjectDto): Promise<Project> {
    const categories = await this.categoryRepo.find({
      where: { id: In(dto.categoryIds) },
    });

    const client = await this.userRepo.findOne({
      where: { id: dto.clientId },
    });

    if (!client) throw new NotFoundException('Client not found');

    const project = this.projectRepo.create({
      title: dto.title,
      description: dto.description,
      budget: dto.budget,
      deadline: dto.deadline,
      category: categories,
      client,
    });

    return await this.projectRepo.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepo.find({
      relations: ['category', 'client', 'assignedFreelancer', 'bids'],
    });
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectRepo.findOne({
      where: { id },
      relations: ['category', 'client', 'assignedFreelancer', 'bids'],
    });

    if (!project) throw new NotFoundException('Project not found');

    return project;
  }
  async findByClientId(id: number) {
    const client = await this.userRepo.findOne({
      where: { id: id },
    });
    console.log('clein', client);
    const project = await this.projectRepo.find({
      where: { client: { id: client?.id } },
      relations: [
        'category',
        'client',
        'assignedFreelancer',
        'bids',
        'bids.freelancer',
        'milestones',
      ],
    });
    console.log('projects', project);
    if (!project) throw new NotFoundException('Project not found');

    return project;
  }
  async findByFreelanceId(id: number) {
    const client = await this.userRepo.findOne({
      where: { id: id },
    });
    console.log('freelnace ', client);
    const project = await this.projectRepo.find({
      where: {
        assignedFreelancer: {
          id: client?.id,
        },
      },
      relations: [
        'category',
        'client',
        'assignedFreelancer',
        'bids',
        'milestones',
      ],
    });

    if (!project) throw new NotFoundException('Project not found');

    return project;
  }
  async update(id: number, dto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectRepo.findOneBy({ id });
    if (!project) throw new NotFoundException('Project not found');

    if (dto.categoryIds) {
      const categories = await this.categoryRepo.find({
        where: { id: In(dto.categoryIds) },
      });
      project.category = categories;
    }

    if (dto.title !== undefined) project.title = dto.title;
    if (dto.description !== undefined) project.description = dto.description;
    if (dto.budget !== undefined) project.budget = dto.budget;
    if (dto.deadline !== undefined) project.deadline = dto.deadline;

    if (dto.assignedFreelancerId !== undefined) {
      const freelancer = await this.userRepo.findOne({
        where: { id: dto.assignedFreelancerId },
      });
      if (!freelancer) throw new NotFoundException('Freelancer not found');
      project.assignedFreelancer = freelancer;
    }

    return this.projectRepo.save(project);
  }

  async remove(id: number): Promise<void> {
    const project = await this.projectRepo.findOneBy({ id });
    if (!project) throw new NotFoundException('Project not found');
    await this.projectRepo.remove(project);
  }
}
