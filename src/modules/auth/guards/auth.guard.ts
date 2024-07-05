import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { Config } from 'src/config/configuration';
import { Permission } from 'src/modules/permissions/models/permission.model';
import { Role } from 'src/modules/permissions/models/role.model';
import { User } from 'src/modules/users/models/user.model';
import { NO_AUTH_KEY } from './no-auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService<Config>,
    @InjectModel(User) private readonly user: typeof User,
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}

  /**
   * Checks if the user is authorized to access the requested route.
   *
   * @param context - The execution context of the route.
   * @returns A promise that resolves to a boolean indicating whether the user is authorized.
   * @throws UnauthorizedException if the user is not authorized.
   * @author Jonathan Alvarado
   */
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
      const user = await this.user.findByPk(payload.sub, {
        include: [
          {
            model: Role,
            include: [Permission],
          },
        ],
      });
      if (!user) {
        throw new UnauthorizedException();
      }

      request['user'] = user;
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
