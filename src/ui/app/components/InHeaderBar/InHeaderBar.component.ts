import { Component, ViewEncapsulation } from 'angular2/core';
import { InIcon } from '../InIcon/InIcon.component';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'header[in-header-bar]',
  templateUrl: 'InHeaderBar.html',
  styleUrls: [
    '../../styles/core.css',
    'InHeaderBar.css'
  ],
  directives: [[InIcon]],
  encapsulation: ViewEncapsulation.Native
})
export class InHeaderBar {
}
