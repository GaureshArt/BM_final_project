import { IsString, IsNotEmpty, IsNumber, IsDateString, IsArray, IsInt } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsInt({ each: true })
  categoryIds: number[];

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  budget: number;

  @IsDateString()
  deadline: Date;

  @IsInt()
  clientId: number;
}
