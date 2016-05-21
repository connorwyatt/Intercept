import { Component, ViewEncapsulation, Input, ViewQuery, QueryList } from '@angular/core';
import { InStatusIndication } from './InStatusIndication';
import { InTooltip } from '../InTooltip/InTooltip.component';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-status-indicator',
  templateUrl: 'InStatusIndicator.html',
  styleUrls: [
    '../../styles/core.css',
    'InStatusIndicator.css',
    'InStatusIndicatorIndicator/InStatusIndicatorIndicator.css'
  ],
  directives: [[InTooltip]],
  host: {
    '(mouseenter)': 'tooltip.first.open()',
    '(mouseleave)': 'tooltip.first.close()'
  },
  encapsulation: ViewEncapsulation.Native
})
export class InStatusIndicator {
  @Input()
  public status: InStatusIndication;
  private tooltip: QueryList<InTooltip>;

  constructor(@ViewQuery(InTooltip) tooltip: QueryList<InTooltip>) {
    this.tooltip = tooltip;
  }
}
