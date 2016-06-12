import 'es6-shim';
import 'rxjs/Rx';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide, enableProdMode } from '@angular/core';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { InApp } from './InApp';
import { InHttp } from './services/InHttp';
import { InElectronCommunication } from './services/InElectronCommunication';
import { InRequestsHelper } from './services/InRequestsHelper';
import { InMessagesHelper } from './services/InMessagesHelper';
import { ElectronIPC } from './services/ElectronIpc';
import { InContentScrollService } from './services/InContentScrollService';

declare const ELECTRON_IPC: ElectronIPC;

//removeIf(development)
enableProdMode();
//endRemoveIf(development)

bootstrap(InApp, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  provide(APP_BASE_HREF, { useValue: '/' }),
  provide(ElectronIPC, { useValue: ELECTRON_IPC }),
  InHttp,
  InElectronCommunication,
  InRequestsHelper,
  InMessagesHelper,
  InContentScrollService
]);
