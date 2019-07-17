import { Module } from '@nestjs/common';
import { join } from 'path';
import { FeAngularUniversalModule } from './module/angular-universal/angular-universal.module';
import { SeoModule } from './module/seo/seo.module';

// TODO: Desirable - implement livereload/watch for locale dev
//  https://github.com/nestjs/ng-universal/blob/master/lib/compiler/live-reload-compiler.ts

const DIST_FOLDER_ROOT = join(process.cwd(), 'dist');
const DIST_FOLDER_BROWSER = join(DIST_FOLDER_ROOT, 'browser');

@Module({
  imports: [
    SeoModule,
    FeAngularUniversalModule.forRoot({
      rootStaticPath: '*.*',
      viewsPath: DIST_FOLDER_BROWSER,
      locales: [
        {
          locale: 'en',
          bundle: require('main.server.en'),
          browserDist: join(DIST_FOLDER_BROWSER, 'en')
        },
        {
          locale: 'sv',
          bundle: require('main.server.sv'),
          browserDist: join(DIST_FOLDER_BROWSER, 'sv')
        }
      ]
    })
  ]
})
export class ApplicationModule {
}
