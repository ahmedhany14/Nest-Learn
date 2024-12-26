import { Injectable } from '@nestjs/common';

// entities
import { MetaOptionsEntity } from './meta-options.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// dto
import { MetaOptionsDto } from './dtos/meta-options.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOptionsEntity)
    private readonly metaOptionsRepository: Repository<MetaOptionsEntity>,
  ) {}

  public async create(metaOptionsDto: MetaOptionsDto) {
    const metaOptions = this.metaOptionsRepository.create(metaOptionsDto);
    return await this.metaOptionsRepository.save(metaOptions);
  }

  public async delete(id: number) {
    // get the metaOptions
    const metaOptions = this.metaOptionsRepository.findOne({ where: { id } });
    // delete the metaOptions
    await this.metaOptionsRepository.delete({ id });
  }
}
