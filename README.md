# Angular Nest Demo

A proof-of-concept for the integration of NestJS for server-side rendering, in an Angular application using i18n.

Based on NestJS [ng-universal](https://github.com/nestjs/ng-universal), this examples provides the ability to serve each i18n bundle, including:
1. SSR/Non-SSR routes
2. Example of organising Angular SSR logic into NestJS module architecture

## Browser App
Local development for i18n:
1. Run either `yarn start:en` or `yarn start:sv`
2. Open your browser to http://localhost:4200

## Server App
To run the SSR version:
1. Run `yarn build:ssr && yarn serve:ssr`
2. Open your browser to http://localhost:4000
