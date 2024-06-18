import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { NO_AUTH } from './auth/guards/no-auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @NO_AUTH()
  getHello(): string {
    return this.appService.getHello();
  }
}
