import {
  Directive,
  ElementRef,
  HostBinding
} from '@angular/core';
import { IInGridItemCoordinates } from '../../../interfaces/IInGridItemCoordinates';

@Directive({
  selector: '[inGridItem]'
})
export class InGridItem {
  public get height() { return (<HTMLElement>this._elementRef.nativeElement).getBoundingClientRect().height; }

  private _elementRef: ElementRef;
  private _coordinates: IInGridItemCoordinates;
  @HostBinding('style.position') private _position: string = 'absolute';
  @HostBinding('style.transition') private _transition: string = 'top 1s ease-in-out, right 1s ease-in-out, bottom 1s ease-in-out, left 1s ease-in-out, width 1s ease-in-out';
  @HostBinding('style.width.px') private get _widthStyle() { return this._coordinates ? this._coordinates.width : null; }
  @HostBinding('style.left.px') private get _leftStyle() { return this._coordinates ? this._coordinates.x : null; }
  @HostBinding('style.top.px') private get _topStyle() { return this._coordinates ? this._coordinates.y : null; }

  constructor(elementRef: ElementRef) {
    this._elementRef = elementRef;
  }

  public setCoordinates(coordinates: IInGridItemCoordinates): void {
    this._coordinates = coordinates;
  }
}
