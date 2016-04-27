import { Component, Input, ViewEncapsulation } from 'angular2/core';
import { IInMessage } from '../../interfaces/IInMessage';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-messages',
  templateUrl: 'InMessages.html',
  styleUrls: [
    '../../styles/core.css',
    'InMessage/InMessage.css'
  ],
  encapsulation: ViewEncapsulation.Native
})
export class InMessages {
  @Input()
  private messages: Array<IInMessage>;
}
