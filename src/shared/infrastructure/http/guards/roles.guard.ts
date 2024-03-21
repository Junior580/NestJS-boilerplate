import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Access denied. Token not provided.');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_PASS,
      });

      if (!token) {
        throw new UnauthorizedException('Access denied. Token not provided.');
      }

      if (!roles.some((role) => payload.role === role)) {
        throw new UnauthorizedException('Access denied', 'Forbidden');
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  private extractTokenFromHeader(request: FastifyRequest): string | undefined {
    const cookies = request.cookies;
    const token = cookies['@auth'];

    return token ? token : undefined;
  }
}
