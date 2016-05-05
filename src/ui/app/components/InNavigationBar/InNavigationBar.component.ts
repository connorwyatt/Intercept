import { Component, ViewEncapsulation, Input } from '@angular/core';
import { InNavigationBarTile } from './InNavigationBarTile/InNavigationBarTile.component';
import { IInLink } from '../../interfaces/IInLink';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'nav[in-navigation-bar]',
  templateUrl: 'InNavigationBar.html',
  styleUrls: [
    '../../styles/core.css',
    'InNavigationBar.css'
  ],
  directives: [[InNavigationBarTile]],
  encapsulation: ViewEncapsulation.Native
})
export class InNavigationBar {
  @Input()
  private links: Array<IInLink>;
}
