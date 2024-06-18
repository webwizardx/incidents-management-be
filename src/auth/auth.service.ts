import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isMatch } from 'src/helpers/hash';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ where: { email } });
    const isNotMatch = !user || !(await isMatch(password, user?.password));
    if (isNotMatch) {
      throw new UnauthorizedException();
    }
    delete user.password;
    const payload = { sub: user.id, user };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
    };
  }
}
