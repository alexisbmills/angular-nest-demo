import { Get, Controller, Res, Req, Param, Next, Inject } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { join } from 'path';
import { readFile } from 'fs';
import { FE_ANGULAR_UNIVERSAL_OPTIONS } from '../dependency-injection/universal.tokens';
import { FeLocaleBundle, FeUniversalOptions } from '../interface/universal.interface';
import { AmpService } from '../../shared/amp/service/amp.service';

@Controller()
export class UniversalController {

  constructor(@Inject(FE_ANGULAR_UNIVERSAL_OPTIONS) private options: FeUniversalOptions,
              private ampService: AmpService) {
  }

  // TODO: Extract locale/site config to separate module
  private localeOptions(locale: string): FeLocaleBundle | undefined {
    return this.options.locales.find((localOptions: FeLocaleBundle) => localOptions.locale === locale);
  }

  // TODO: Implement environment config endpoint:
  //  based on whitelist of browser-only environment config to prevent server config being exposed to client
  @Get('/assets/config/config.json')
  browserConfig(@Res() res: Response) {
    const config = {};
    res.header('Content-Type', 'text/javascript');
    res.write(JSON.stringify(config));
    res.end();
  }

  @Get([
    `account/callback`,
    `application/*`,
    `:locale/account/callback`,
    `:locale/application/*`,
  ])
  nonSsr(@Res() res: Response, @Next() next: NextFunction, @Param('locale') locale: string) {
    // TODO: Implement default locale
    const localeConfiguration = this.localeOptions(locale);
    if (!localeConfiguration) {
      res.redirect(404, `/en/404`);
      return;
    }
    readFile(
      join(localeConfiguration.browserDist, 'index.html'),
      'utf8',
      (err, html) => {

        // TODO: 3rd party library scripts (gtm, new relic) as separate shared modules

        res.send(html);
      });
  }

  @Get([`:locale`, `:locale/*`])
  ssrI18n(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
    @Param('locale') locale: string
  ) {
    // TODO: Implement default locale
    const localeConfiguration = this.localeOptions(locale);
    if (!localeConfiguration) {
      res.redirect(404, `/en/404`);
      return;
    }

    readFile(
      join(localeConfiguration.browserDist, 'index.html'),
      'utf8',
      (err, html) => {

        // TODO: 3rd party library scripts (gtm, new relic) as separate shared modules

        res.render(
          join(localeConfiguration.browserDist, 'index.html'),
          {
            req,
            res,
            engine: localeConfiguration.engine,
            document: html,
          },
          (ssrErr: Error, ssrHtml: string) => {
            if (ssrErr) {
              console.error(ssrErr);
            }
            const finalHtml = this.ampService.toAmpHtml(ssrHtml);
            res.send(finalHtml);
          }
        );
      });
  }

  @Get()
  root(@Req() request: Request, @Res() response: Response) {
    response.redirect(301, `/en${request.url}`);
  }
}
