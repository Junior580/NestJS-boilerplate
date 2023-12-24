import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Access denied. Token not provided.');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_PASS,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('JWT token is invalid');
    }
    return true;
  }

  private extractTokenFromHeader(request: FastifyRequest): string | undefined {
    const cookies = request.cookies;
    const token = cookies['@token'];

    return token ? token : undefined;
  }
}
