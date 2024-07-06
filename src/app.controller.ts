import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { API_BEARER_AUTH } from './constants';
import { NO_AUTH } from './modules/auth/guards/no-auth.decorator';

@ApiBearerAuth(API_BEARER_AUTH)
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
