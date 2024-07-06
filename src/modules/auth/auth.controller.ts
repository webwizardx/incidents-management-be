import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_BEARER_AUTH } from 'src/constants';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signin.dto';
import { NO_AUTH } from './guards/no-auth.decorator';

@ApiBearerAuth(API_BEARER_AUTH)
@ApiTags('Authentication')
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
  /**
   * Signs in a user.
   *
   * @param signInDto - The sign-in data transfer object.
   * @returns A promise that resolves to the signed-in user.
   * @author Jonathan Alvarado
   */
  signIn(@Body() signInDto: SignInDTO) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
