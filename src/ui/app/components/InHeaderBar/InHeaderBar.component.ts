import { Component, ViewEncapsulation } from 'angular2/core';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'header[in-header-bar]',
  templateUrl: 'InHeaderBar.html',
  styleUrls: [
    '../../styles/core.css',
    'InHeaderBar.css'
  ],
  encapsulation: ViewEncapsulation.Native
})
export class InHeaderBar {
}
