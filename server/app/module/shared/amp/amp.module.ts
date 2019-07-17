import { Module } from '@nestjs/common';
import { AmpService } from './service/amp.service';
import { ConfigModule } from '../config/config.module';
import { AmpConfig } from './config/amp.config';
import { AMP_CONFIG } from './dependency-injection/config.token';

@Module({
  imports: [ConfigModule],
  providers: [
    { provide: AMP_CONFIG, useClass: AmpConfig },
    AmpService
  ],
  exports: [
    AmpService
  ]
})
export class AmpModule {
}