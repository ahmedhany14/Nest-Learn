import { ConfigModule, ConfigService } from '@nestjs/config';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Modules
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';

// entities
import { User } from './user/entite/user.entitie';
import { Post } from './post/entitie/post.entitie';
import { Tags } from './tags/tags.entity';
import { MetaOptionsEntity } from './meta-options/meta-options.entity';

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from './tags/tags.module';
import { PaginationModule } from './common/pagination/pagination.module';

// Configuration
import databaseConfig from "./config/database.config";
import appConfig from './config/app.config';

const env = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // make the configuration global in all the app
      envFilePath: `.env.${env}`,
      load: [appConfig, databaseConfig], // load the appConfig function to use it in the configuration
    }),
    UserModule,
    PostModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // import the ConfigModule to use the ConfigService
      inject: [ConfigService], // inject the ConfigService to use it in the factory function
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // entities: [User, Post, Tags, MetaOptionsEntity],
        autoLoadEntities: configService.get<boolean>(
          'DATABASE_AUTO_LOAD_ENTITIES',
        ),
        synchronize: configService.get<boolean>('database.synchronize'),
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
      }),
    }),
    TagsModule,
    MetaOptionsModule,
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
