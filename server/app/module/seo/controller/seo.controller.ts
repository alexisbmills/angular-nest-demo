import { Get, Controller, Res, Req, Param, Next, Inject } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SeoService } from '../service/seo.service';


@Controller()
export class SeoController {

  constructor(private seoService: SeoService) {
  }

  // TODO: full logic
  @Get(`robots.txt`)
  robots(@Req() req: Request, @Res() res: Response) {
    const robotsTxt = this.seoService.robots(req.hostname);
    res.send(robotsTxt);
  }

  // TODO: full logic
  @Get(['/sitemap.xml', '/:locale/sitemap.xml'])
  async sitemap(@Req() req: Request, @Res() res: Response, @Param('locale') locale: string) {
    const defaultSitemapXml = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>';
    try {
      const sitemapXml = await this.seoService.sitemap(req.hostname, locale);
      res.send(sitemapXml);
    } catch (err) {
      res.send(defaultSitemapXml);
    }
  }
}
