import { Component, ViewEncapsulation, Input } from 'angular2/core';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-card',
  templateUrl: 'InCard.html',
  styleUrls: [
    '../../styles/core.css',
    'InCard.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class InCard {
  @Input()
  private theme: string;
}
