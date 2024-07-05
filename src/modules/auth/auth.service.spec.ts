import { TestBed } from '@automock/jest';
import { UnauthorizedException } from '@nestjs/common';
import { isMatch } from 'src/helpers/hash';
import { UsersService } from 'src/modules/users/users.service';
import { AuthService } from './auth.service';

jest.mock('src/helpers/hash', () => ({
  isMatch: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: jest.Mocked<UsersService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(AuthService).compile();

    authService = unit;
    usersService = unitRef.get(UsersService);
  });

  describe('signIn', () => {
    it('should successfully login', async () => {
      usersService.findOne.mockResolvedValueOnce({
        password: 'password',
      } as any);
      (isMatch as jest.Mock).mockResolvedValueOnce(true);
      const result = await authService.signIn('john@doe.com', 'password');

      expect(result).toBeTruthy();
    });

    it('should throw an UnauthorizedException', async () => {
      try {
        usersService.findOne.mockResolvedValueOnce({
          password: 'password',
        } as any);
        (isMatch as jest.Mock).mockResolvedValueOnce(false);
        await authService.signIn('john@doe.com', 'password');
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
  });
});
