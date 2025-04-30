import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest() as Request;
      const token = req.cookies['access_token'];
      console.log("This is cookie token",token)
      if (!token) {
        throw new HttpException('Token not found', 401);
      }

      await this.jwtService.verifyAsync(token);

      return true;
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new HttpException('Invalid token', 401);
      }

      if (err.name === 'TokenExpiredError') {
        throw new HttpException('Token has expired', 401);
      }

      throw new HttpException('Unauthorized: ' + err.message, 401);
    }
  }
}
