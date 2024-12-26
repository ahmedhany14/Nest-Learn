import { Body, Controller, Post } from '@nestjs/common';

//Services
import { MetaOptionsService } from './meta-options.service';

//dto
import { MetaOptionsDto } from './dtos/meta-options.dto';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOptionsService: MetaOptionsService) {}

  @Post()
  public async create(@Body() metaOptionsDto: MetaOptionsDto) {
    return await this.metaOptionsService.create(metaOptionsDto);
  }
}
