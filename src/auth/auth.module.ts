import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Config } from 'src/config/configuration';
import { PoliciesGuard } from 'src/permissions/guards/policies.guard';
import { RolesGuard } from 'src/permissions/guards/roles.guard';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { User } from 'src/users/models/user.model';
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
        signOptions: { expiresIn: '1h' },
      }),
    }),
    PermissionsModule,
    SequelizeModule.forFeature([User]),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard,
    },
    AuthService,
  ],
})
export class AuthModule {}
