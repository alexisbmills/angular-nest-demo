import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';

@Injectable()
export class SeoService {

  constructor(private http: HttpService) {
  }

  robots(hostname: string): string {

    return 'contents of robots.txt';
  }


  async sitemap(hostname: string, locale: string): Promise<string> {
    return this.http.get('http://configurable-url/sitemap')
      .pipe(
        map((value: AxiosResponse<string>) => value.data)
      ).toPromise();
  }
}
