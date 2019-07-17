import { HttpService, Inject, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { AMP_CONFIG } from '../dependency-injection/config.token';
import { AmpConfigAccess } from '../config/amp.config.interface';

@Injectable()
export class AmpService {

  constructor(@Inject(AMP_CONFIG) private ampConfig: AmpConfigAccess) {
  }

  toAmpHtml(html: string): string {
    if (!this.ampConfig.isAmpEnabled) {
      return html;
    }
    // TODO: import and call amp sanitization logic
    return '';
  }
}
