import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/service/config.service';
import { AmpConfigAccess } from './amp.config.interface';

@Injectable()
export class AmpConfig implements AmpConfigAccess {

  readonly isAmpEnabled: boolean;

  constructor(private configService: ConfigService) {
    this.isAmpEnabled = this.configService.getBoolean('AMP_ENABLE', false);
  }
}