import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';

import {InDashboard} from './areas/InDashboard';

@Component({
  selector: 'in-app',
  templateUrl: 'app/InApp.html',
  directives: [RouterOutlet]
})
@RouteConfig([
  {path:'/dashboard', name: 'Dashboard', component: InDashboard, useAsDefault: true}
])
export class InApp {
}
