
export interface FeLocaleBundle {
  locale: string;
  bundle: { AppServerModuleNgFactory: any; LAZY_MODULE_MAP: any };
  engine?: any;
  browserDist: string;
}

export interface FeUniversalOptions {
  rootStaticPath: string;
  viewsPath: string;
  locales: FeLocaleBundle[];
  extraProviders?: any[];
}
