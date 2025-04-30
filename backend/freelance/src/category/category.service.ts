import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}
  async findAll(): Promise<Category[]> {
    return await this.categoryRepo.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['projects'],
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

}
