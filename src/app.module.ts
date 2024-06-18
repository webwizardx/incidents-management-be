import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import configuration, { Config } from './config/configuration';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<Config>) => {
        const databaseConfig = await import('./config/database.config.json');
        const env = configService.get('env');
        const isTEST = /test/i.test(env);
        if (isTEST) {
          return databaseConfig['test'] as SequelizeModuleOptions;
        }

        return databaseConfig['local'] as SequelizeModuleOptions;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
