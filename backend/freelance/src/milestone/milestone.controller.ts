import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { MilestoneService } from './milestone.service';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { UpdateMilestoneDto } from './dto/update-milestone.dto';

@Controller('milestones')
export class MilestoneController {
  constructor(private readonly milestoneService: MilestoneService) {}

  @Post()
  create(@Body() dto: CreateMilestoneDto) {
    return this.milestoneService.create(dto);
  }

  @Get()
  findAll() {
    return this.milestoneService.findAll();
  }

  @Get('project/:projectId')
  findByProject(@Param('projectId') projectId: number) {
    return this.milestoneService.findByProject(projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.milestoneService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateMilestoneDto) {
    return this.milestoneService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.milestoneService.remove(id);
  }
}
