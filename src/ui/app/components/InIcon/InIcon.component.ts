import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-icon',
  template: '<span class="InIcon" [innerHTML]="svg"></span>',
  styleUrls: [
    'InIcon.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class InIcon implements OnChanges {
  @Input()
  private icon: string;
  private iconBaseLocation: string = '/resources/icons/';
  private http: Http;
  private svg: string;

  constructor(http: Http) {
    this.http = http;
  }

  ngOnChanges() {
    this.updateIcon();
  }

  private updateIcon() {
    this.http.get(this.iconBaseLocation + this.icon + '.svg')
      .subscribe(
        (svg) => {
          this.svg = svg.text();
        }
      );
  }
}
