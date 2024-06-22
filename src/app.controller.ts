import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { NO_AUTH } from './auth/guards/no-auth.decorator';

@ApiBearerAuth('BearerJWT')
@ApiTags('Default')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @NO_AUTH()
  getHello() {
    return this.appService.getHello();
  }
}
