import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateRegisterDto } from './dto/create-register.dto';
import { Response } from 'express'; 
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @UseInterceptors(FileInterceptor('profileImage'))
  async create(@Body() createRegisterDto: CreateRegisterDto,  @UploadedFile() file: Express.Multer.File) {
    return await this.authService.register(createRegisterDto,file);
  }
  @Post('login')
  login(@Body() createAuthDto:CreateAuthDto,@Res({ passthrough: true }) res: Response){
    return this.authService.login(createAuthDto,res);
  }
  
}
