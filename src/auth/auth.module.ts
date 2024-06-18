import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { Config } from 'src/config/configuration';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config>) => ({
        global: true,
        secret: configService.get('secret'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
  ],
})
export class AuthModule {}
