import { Directive } from '@angular/core';
import { InContentScrollService } from '../../services/InContentScrollService';

@Directive({
  selector: '[inContentScroll]',
  host: {
    '(scroll)': 'onScroll()'
  }
})
export class InContentScroll {
  private scrollService: InContentScrollService;

  constructor(scrollService: InContentScrollService) {
    this.scrollService = scrollService;
  }

  private onScroll() {
    this.scrollService.next();
  }
}
