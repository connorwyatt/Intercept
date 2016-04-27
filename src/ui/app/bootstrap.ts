import { bootstrap } from 'angular2/platform/browser';
import { provide } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { APP_BASE_HREF, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';
import { InApp } from './InApp';
import { InHttp } from './services/InHttp';
import { InSocket } from './services/InSocket';
import { InRequestsHelper } from './services/InRequestsHelper';
import { InMessagesHelper } from './services/InMessagesHelper';
import 'es6-shim';
import 'rxjs/Rx';

bootstrap(InApp, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  provide(APP_BASE_HREF, { useValue: '/' }),
  InHttp,
  InSocket,
  InRequestsHelper,
  InMessagesHelper
]);
