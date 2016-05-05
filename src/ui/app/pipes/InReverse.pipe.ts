import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inReverse',
  pure: false
})
export class InReversePipe implements PipeTransform {
  transform(value: any, args: any[]) {
    return value.reverse();
  }
}
