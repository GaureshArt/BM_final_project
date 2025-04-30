import {
  IsString,
  IsEmail,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsDate,
} from 'class-validator';
import { UserRole } from '../entities/user.entity';
import { Skill } from '../../skill/entities/skill.entity';

export class UserResponseDto {
  id: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  skills: Skill[];
  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt: Date;
}
