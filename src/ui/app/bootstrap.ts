import { bootstrap } from 'angular2/platform/browser';
import { provide } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { APP_BASE_HREF, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';
import { InApp } from './InApp';
import { InHttp } from './services/InHttp';
import { InElectronCommunication } from './services/InElectronCommunication';
import { InRequestsHelper } from './services/InRequestsHelper';
import { InMessagesHelper } from './services/InMessagesHelper';
import 'es6-shim';
import 'rxjs/Rx';
import { ElectronIPC } from './services/ElectronIpc';

declare const ELECTRON_IPC: ElectronIPC;

bootstrap(InApp, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  provide(APP_BASE_HREF, { useValue: '/' }),
  provide(ElectronIPC, { useValue: ELECTRON_IPC }),
  InHttp,
  InElectronCommunication,
  InRequestsHelper,
  InMessagesHelper
]);
