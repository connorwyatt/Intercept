import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { InIcon } from '../../InIcon/InIcon.component';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-navigation-bar-tile',
  templateUrl: 'InNavigationBarTile.html',
  styleUrls: [
    '../../../styles/core.css',
    'InNavigationBarTile.css'
  ],
  directives: [[InIcon]],
  encapsulation: ViewEncapsulation.Native
})
export class InNavigationBarTile {
  @Input()
  private link: Array<string>;

  @Input()
  private label: string;

  @Input()
  private icon: string;

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
