import {
  Component,
  ElementRef,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import { InContentScrollService } from '../../services/InContentScrollService';

declare const __moduleName: string;

interface ITooltipPositionStyles {
  left: string;
  top: string;
}

@Component({
  moduleId: __moduleName,
  selector: 'in-tooltip',
  templateUrl: 'InTooltip.html',
  styleUrls: [
    '../../styles/core.css',
    'InTooltip.css'
  ],
  encapsulation: ViewEncapsulation.Native,
  host: {
    '[class.is-open]': 'isOpen',
    '(window:resize)': 'updateTooltipPosition()'
  }
})
export class InTooltip {
  @Input()
  public message: string;
  private element: HTMLElement;
  private scrollService: InContentScrollService;
  public tooltipPosition: ITooltipPositionStyles;
  private scrollSubscription: Subscription;
  public isOpen: boolean;

  constructor(elementRef: ElementRef,
              scrollService: InContentScrollService) {
    this.element = elementRef.nativeElement;
    this.scrollService = scrollService;
  }

  public open() {
    this.isOpen = true;
    this.updateTooltipPosition();
    this.subscribeToScroll();
  }

  public close() {
    this.isOpen = false;
    this.scrollSubscription.unsubscribe();
  }

  private subscribeToScroll(): void {
    this.scrollSubscription = this.scrollService.getObservable()
      .auditTime(1000/60)
      .subscribe(() => {
        console.log('SCROLL');
        this.updateTooltipPosition();
      });
  }

  private updateTooltipPosition(): void {
    this.tooltipPosition = this.getTooltipPosition();
  }

  private getTooltipPosition(): ITooltipPositionStyles {
    let tooltipPosition: ITooltipPositionStyles = {
        left: null,
        top: null
      },
      elementPosition = this.element.getBoundingClientRect();

    tooltipPosition.left = elementPosition.left + (elementPosition.width / 2) + 'px';
    tooltipPosition.top = elementPosition.bottom + 'px';

    return tooltipPosition;
  }
}
