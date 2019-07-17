import { HttpModule, Module } from '@nestjs/common';
import { SeoService } from './service/seo.service';
import { SeoController } from './controller/seo.controller';

@Module({
  imports: [HttpModule],
  controllers: [SeoController],
  providers: [
    SeoService
  ]
})
export class SeoModule {
}