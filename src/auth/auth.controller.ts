import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signin.dto';
import { NO_AUTH } from './guards/no-auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    description: 'This endpoint is used to sign in a user',
    summary: 'Sign in a user',
  })
  @HttpCode(HttpStatus.OK)
  @NO_AUTH()
  @Post('login')
  signIn(@Body() signInDto: SignInDTO) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
