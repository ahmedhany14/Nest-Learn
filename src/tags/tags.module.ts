import { Module } from '@nestjs/common';

// entities
import { Tags } from './tags.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tags])],
})
export class TagsModule {}
