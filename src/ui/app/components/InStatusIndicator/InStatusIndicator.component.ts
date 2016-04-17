import { Component, ViewEncapsulation, Input } from 'angular2/core';
import { InStatusIndication } from './InStatusIndication';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-status-indicator',
  templateUrl: 'InStatusIndicator.html',
  styleUrls: [
    '../../styles/core.css',
    'InStatusIndicator.css'
  ],
  encapsulation: ViewEncapsulation.Native
})
export class InStatusIndicator {
  @Input()
  private status: InStatusIndication;
}
