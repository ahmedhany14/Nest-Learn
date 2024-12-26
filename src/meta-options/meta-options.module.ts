import { Module } from '@nestjs/common';

// entities
import { MetaOptionsEntity } from './meta-options.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOptionsService } from './meta-options.service';
import { MetaOptionsController } from './meta-options.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MetaOptionsEntity])],
  providers: [MetaOptionsService],
  controllers: [MetaOptionsController],
  exports: [MetaOptionsService],
})
export class MetaOptionsModule {}
