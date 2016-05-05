import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inDate'
})
export class InDatePipe implements PipeTransform {
  transform(value: Date): string {
    return value.toLocaleString('en-GB');
  }
}
