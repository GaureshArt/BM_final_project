// src/bid/bid.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bid } from './entities/bid.entity';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { Project } from '../project/entities/project.entity';
import { User } from '../user/entities/user.entity';
import { BidStatus } from './entities/bid.entity';

@Injectable()
export class BidService {
  constructor(
    @InjectRepository(Bid)
    private bidRepo: Repository<Bid>,

    @InjectRepository(Project)
    private projectRepo: Repository<Project>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}


  async create(createBidDto: CreateBidDto): Promise<Bid> {
    const freelancer = await this.userRepo.findOne({ where: { id: createBidDto.freelancerId } });
    const project = await this.projectRepo.findOne({ where: { id: createBidDto.projectId } });

    if (!freelancer) throw new NotFoundException('Freelancer not found');
    if (!project) throw new NotFoundException('Project not found');

    const bid = this.bidRepo.create({
      freelancer,
      project,
      initialAmount: createBidDto.initialAmount,
      initialDurationDays: createBidDto.initialDurationDays,
      finalAmount: createBidDto.finalAmount,
      finalDurationDays: createBidDto.finalDurationDays,
      initialMessage: createBidDto.initialMessage,
      status: createBidDto.status,
    });

    return await this.bidRepo.save(bid);
  }

  async update(id: number, updateBidDto: UpdateBidDto): Promise<Bid> {
    const bid = await this.bidRepo.findOne({ where: { id } });
    if (!bid) throw new NotFoundException('Bid not found');

    

    if (updateBidDto.initialAmount !== undefined) bid.initialAmount = updateBidDto.initialAmount;
    if (updateBidDto.initialDurationDays !== undefined) bid.initialDurationDays = updateBidDto.initialDurationDays;

    if (updateBidDto.status) bid.status = updateBidDto.status;
    
    return await this.bidRepo.save(bid);
  }


  async remove(id: number): Promise<void> {
    const bid = await this.bidRepo.findOne({ where: { id } });
    if (!bid) throw new NotFoundException('Bid not found');

    await this.bidRepo.remove(bid);
  }

  async findAllByProject(projectId: number): Promise<Bid[]> {
    return this.bidRepo.find({
      where: { project: { id: projectId } },
      relations: ['freelancer', 'project'],
    });
  }

  async findProjects(freelancerId: number): Promise<Project[]> {
    const bids = await this.bidRepo.find({
      where: { freelancer: { id: freelancerId } },
      relations: ['project'],
    });
  
    return bids.map(bid => bid.project);
  }
  
  async findOne(id: number): Promise<Bid> {
    const bid = await this.bidRepo.findOne({
      where: { id },
      relations: ['freelancer', 'project'],
    });

    if (!bid) throw new NotFoundException('Bid not found');
    return bid;
  }
}
