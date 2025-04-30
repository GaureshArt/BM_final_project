import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Skill } from '../skill/entities/skill.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UserResponseDto } from './dto/response-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Skill) private skillRepo: Repository<Skill>,
    private cloudinaryService: CloudinaryService,
  ) {
 
  }
  async create(createUserDto: CreateUserDto, file?: Express.Multer.File) {
    const { skills: skillIds, ...userData } = createUserDto;
  
    if (file) {

      const result = await this.cloudinaryService.uploadFile(file, 'image');
      userData.profileImageUrl = result.secure_url; 
    }
  
    const user = this.userRepo.create(userData);
  
    if (skillIds?.length) {
      user.skills = await this.skillRepo.findBy({ id: In(skillIds) });
    }
  
    return await this.userRepo.save(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new HttpException('user not found', 404);
    }
    const {password,...data} = user;
    return data
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { skills: skillIds, ...userData } = updateUserDto;

    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['skills'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, userData);

    if (skillIds && skillIds.length > 0) {
      const skills = await this.skillRepo.find({ where: { id: In(skillIds) } });

      user.skills = skills;
    }

    const res = await this.userRepo.save(user);

    return res;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
