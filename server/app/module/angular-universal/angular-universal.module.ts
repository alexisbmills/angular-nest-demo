import { DynamicModule, Inject, Module, OnModuleInit, Provider } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { setupUniversal } from './dependency-injection/universal.provider';
import { FE_ANGULAR_UNIVERSAL_OPTIONS } from './dependency-injection/universal.tokens';
import { UniversalController } from './controller/universal.controller';
import { FeLocaleBundle, FeUniversalOptions } from './interface/universal.interface';
import { AmpModule } from '../shared/amp/amp.module';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

export const angularUniversalProviders: Provider[] = [
  {
    provide: 'FE_UNIVERSAL_INITIALIZER',
    useFactory: (
      host: HttpAdapterHost,
      options: FeUniversalOptions
    ) => {
      return host &&
        host.httpAdapter &&
        setupUniversal(host.httpAdapter.getInstance(), options);
    },
    inject: [HttpAdapterHost, FE_ANGULAR_UNIVERSAL_OPTIONS]
  },
];

@Module({
  imports: [AmpModule],
  controllers: [UniversalController],
  providers: [...angularUniversalProviders]
})
export class FeAngularUniversalModule {
  constructor(
    @Inject(FE_ANGULAR_UNIVERSAL_OPTIONS)
    private readonly ngOptions: FeUniversalOptions) {
  }

  static forRoot(options: FeUniversalOptions): DynamicModule {
    return {
      module: FeAngularUniversalModule,
      providers: [
        {
          provide: FE_ANGULAR_UNIVERSAL_OPTIONS,
          useFactory: (): FeUniversalOptions =>   {
            return {
              ...options,
              locales: options.locales.map((locale: FeLocaleBundle) => {
                return {
                  ...locale,
                  engine: ngExpressEngine({
                    bootstrap: locale.bundle.AppServerModuleNgFactory,
                    providers: [provideModuleMap(locale.bundle.LAZY_MODULE_MAP)]
                  })
                };
              })
            };
          }
        }
      ]
    };
  }
}
