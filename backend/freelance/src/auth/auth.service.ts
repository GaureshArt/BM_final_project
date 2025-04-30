import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateRegisterDto } from './dto/create-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express'; 
import { comparePasswords, hashPassword } from './util/bcrypt.util';
import { UserService } from 'src/user/user.service';
const config = require('../../config/configEnv')

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async register(dto: CreateRegisterDto,file:Express.Multer.File) {
    try {

      const user = await this.userRepo.findOne({
        where: { email: dto.email },
      });
      if (user) {
        throw new HttpException('user already exist', 409);
      }
      const hashPass = await hashPassword(dto.password);

      return await this.userService.create({ ...dto, password: hashPass },file);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async login(dto: CreateAuthDto,res:Response) {
    const user = await this.userRepo.findOne({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    if (!(await comparePasswords(dto.password, user.password))) {
      throw new HttpException('Login Credentails are not correct', 401);
    }
    const payload = { sub: user.id, email: user.email };
    console.log("TOken",config.JWT_SECRET)
    const accesstoken = await this.jwtService.signAsync(payload);
    res.cookie('access_token', accesstoken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60, 
    });
    return {
      message:"Login successful",
      id:user.id,
      role:user.role
    };
  }
 
}
