import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({
  name: 'inDate'
})
export class InDatePipe implements PipeTransform {
  transform(value: Date): string {
    return value.toLocaleString('en-GB');
  }
}
