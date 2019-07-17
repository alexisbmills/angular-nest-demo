import * as express from 'express';
import { FeUniversalOptions } from '../interface/universal.interface';

export function setupUniversal(app: any, feUniversalOptions: FeUniversalOptions) {
  // HTML engine using a wrapper to get the correct ngExpressEngine by locale id
  app.engine('html', (filePath: any, options: any, callback: any) => {
    options.engine(
      filePath,
      {
        req: options.req,
        res: options.res,
        providers: [
          {
            provide: 'REQUEST', useValue: (options.req)
          },
          {
            provide: 'RESPONSE', useValue: (options.res)
          },
        ],
        document: options.document,
      },
      callback
    );
  });

  app.set('view engine', 'html');

  // Serve static files
  app.get(
    feUniversalOptions.rootStaticPath,
    express.static(feUniversalOptions.viewsPath)
  );
}
