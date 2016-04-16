import { Component, ViewEncapsulation } from 'angular2/core';
import { RouteConfig, RouterOutlet } from 'angular2/router';
import { InHeaderBar } from './components/InHeaderBar/InHeaderBar.component';
import { InNavigationBar } from './components/InNavigationBar/InNavigationBar.component';
import { InDashboard } from './areas/InDashboard/InDashboard';
import { InSettings } from './areas/InSettings/InSettings';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-app',
  templateUrl: 'InApp.html',
  styleUrls: [
    'styles/core.css',
    'InApp.css'
  ],
  encapsulation: ViewEncapsulation.Native,
  directives: [[RouterOutlet], [InHeaderBar, InNavigationBar]]
})
@RouteConfig([
  { path: '/dashboard', name: 'Dashboard', component: InDashboard, useAsDefault: true },
  { path: '/settings', name: 'Settings', component: InSettings }
])
export class InApp {
}
