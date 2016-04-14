import { Component } from 'angular2/core';
import { RouteConfig, RouterLink, RouterOutlet } from 'angular2/router';
import { InDashboard } from './areas/InDashboard/InDashboard';
import { InSettings } from './areas/InSettings/InSettings';

@Component({
  selector: 'in-app',
  templateUrl: 'app/InApp.html',
  directives: [[RouterLink, RouterOutlet]]
})
@RouteConfig([
  { path: '/dashboard', name: 'Dashboard', component: InDashboard, useAsDefault: true },
  { path: '/settings', name: 'Settings', component: InSettings }
])
export class InApp {
}
