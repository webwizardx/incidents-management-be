import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isMatch } from 'src/helpers/hash';
import { Role } from 'src/permissions/models/role.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  /**
   * Sign in a user with the provided email and password.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns A promise that resolves to an object containing the access token and the user.
   * @throws UnauthorizedException if the email or password is incorrect.
   * @author Jonathan Alvarado
   */
  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(
      {
        include: Role,
        where: { email },
      },
      'withPassword'
    );
    const isNotMatch = !user || !(await isMatch(password, user?.password));
    if (isNotMatch) {
      throw new UnauthorizedException();
    }
    delete user.dataValues.password;
    const payload = { sub: user.id, user };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
    };
  }
}
