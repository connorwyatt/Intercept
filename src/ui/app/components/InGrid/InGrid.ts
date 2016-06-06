import * as _ from 'lodash';
import {
  Directive,
  Input,
  ElementRef,
  ContentChildren,
  HostBinding,
  HostListener,
  QueryList,
  AfterContentInit
} from '@angular/core';
import { InGridItem } from './InGridItem/InGridItem';
import { IInGridItemCoordinates } from '../../interfaces/IInGridItemCoordinates';

@Directive({
  selector: '[inGrid]'
})
export class InGrid implements AfterContentInit {
  @ContentChildren(InGridItem) private _gridItems: QueryList<InGridItem>;
  @HostBinding('style.height.px') private _layoutHeight: number = 0;
  @HostBinding('style.margin.px') private get _containerMargin() { return -(this._gutterSize / 2); }
  @HostBinding('style.position') private _position: string = 'relative';
  @HostListener('window:resize') private _throttledResizeHandler: Function;
  private _elementRef: ElementRef;
  @Input('maxColumns') private _maxColumns: number;
  private _columnMaxWidth: number = 540;
  private _gutterSize: number = 24;

  constructor(elementRef: ElementRef) {
    this._elementRef = elementRef;

    this._throttledResizeHandler = _.throttle(this._setLayout, 20);
  }

  public ngAfterContentInit(): any {
    this._setLayout();
  }

  public ngAfterViewInit(): any {}

  private _getNumberOfColumns(): number {
    let element = <HTMLElement>this._elementRef.nativeElement;

    let sizes = element.getBoundingClientRect();

    let availableColumns = Math.ceil(sizes.width / this._columnMaxWidth);

    if (this._maxColumns) {
      return _.min([availableColumns, this._maxColumns]);
    } else {
      return availableColumns;
    }
  }

  private _getColumnWidth(): number {
    let element = <HTMLElement>this._elementRef.nativeElement;

    let sizes = element.getBoundingClientRect();

    return sizes.width / this._getNumberOfColumns();
  }

  private _setLayout(): void {
    let columns = this._getNumberOfColumns(),
      currentColumnHeights: number[] = Array<number>(columns).fill(0);

    this._gridItems.forEach((gridItem: InGridItem) => {
      let smallestColumnIndex: number = 0;

      currentColumnHeights.reduce((currentSmallestHeight: number, height: number, index: number) => {
        if (height < currentSmallestHeight) {
          currentSmallestHeight = height;
          smallestColumnIndex = index;
        }

        return currentSmallestHeight;
      }, Infinity);

      let coordinates: IInGridItemCoordinates = {
        x: this._getColumnWidth() * smallestColumnIndex + this._gutterSize / 2,
        y: currentColumnHeights[smallestColumnIndex] + this._gutterSize / 2,
        width: this._getColumnWidth() - this._gutterSize
      };

      gridItem.setCoordinates(coordinates);

      currentColumnHeights[smallestColumnIndex] = currentColumnHeights[smallestColumnIndex] + gridItem.height + this._gutterSize;
    });

    this._layoutHeight = _.max(currentColumnHeights);
  }
}
