import { Component, Input, ViewEncapsulation } from 'angular2/core';
import { Router } from 'angular2/router';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-navigation-bar-tile',
  templateUrl: 'InNavigationBarTile.html',
  styleUrls: [
    '../../../styles/core.css',
    'InNavigationBarTile.css'
  ],
  encapsulation: ViewEncapsulation.Native
})
export class InNavigationBarTile {
  @Input()
  private link: Array<String>;

  @Input()
  private label: String;

  private get isRouteActive() {
    return this.router.isRouteActive(this.router.generate(this.link));
  }

  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  private navigate() {
    this.router.navigate(this.link);
  }
}
