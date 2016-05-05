import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, RouterOutlet } from '@angular/router-deprecated';
import { InHeaderBar } from './components/InHeaderBar/InHeaderBar.component';
import { InNavigationBar } from './components/InNavigationBar/InNavigationBar.component';
import { InDashboard } from './areas/InDashboard/InDashboard';
import { InRequests } from './areas/InRequests/InRequests';
import { InRules } from './areas/InRules/InRules';
import { InSettings } from './areas/InSettings/InSettings';
import { IInLink } from './interfaces/IInLink';

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
  { path: '/requests', name: 'Requests', component: InRequests },
  { path: '/rules/...', name: 'Rules', component: InRules },
  { path: '/settings', name: 'Settings', component: InSettings }
])
export class InApp {
  private links: Array<IInLink> = [
    {
      link: ['Dashboard'],
      label: 'Dashboard',
      icon: 'dashboard'
    },
    {
      link: ['Requests'],
      label: 'Requests',
      icon: 'requests'
    },
    {
      link: ['Rules'],
      label: 'Rules',
      icon: 'rules'
    },
    {
      link: ['Settings'],
      label: 'Settings',
      icon: 'settings'
    }
  ];
}
