import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { privateDecrypt } from 'crypto';

@Injectable()
export class SkillService {
  constructor(@InjectRepository(Skill) private skillRepo:Repository<Skill>){}

  async findAll() {
    return await this.skillRepo.find();
  }


}
