import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Config } from 'src/config/configuration';
import { NO_AUTH_KEY } from './no-auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService<Config>,
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const NO_AUTH = this.reflector.getAllAndOverride<boolean>(NO_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (NO_AUTH) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('secret'),
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload.user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
