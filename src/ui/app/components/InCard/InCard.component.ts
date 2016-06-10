import { Component, ViewEncapsulation, Input } from '@angular/core';
import { IInMessage } from '../../interfaces/IInMessage';
import { InMessages } from '../InMessages/InMessages.component';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-card',
  templateUrl: 'InCard.html',
  styleUrls: [
    'InCard.css'
  ],
  directives: [[InMessages]],
  encapsulation: ViewEncapsulation.None
})
export class InCard {
  @Input()
  private theme: string;

  @Input()
  private heading: string;

  @Input()
  private messages: Array<IInMessage>;
}
