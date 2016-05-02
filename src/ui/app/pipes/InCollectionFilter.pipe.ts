import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({
  name: 'inCollectionFilter'
})
export class InCollectionFilterPipe implements PipeTransform {
  transform(collection: Array<Object>, ...args: any[]): Array<Object> {
    if (!args || args.length === 0) {
      return collection;
    } else {
      let filterString: string = args[0],
        columns: Array<string> = args[1];

      if (!filterString) {
        return collection;
      } else {
        let searchTerms: Array<string> = filterString.split(' ')
          .filter((term) => Boolean(term));

        return collection.filter((value: Object): boolean => {
          let searchableText = this.getSearchableText(value, columns);

          return searchTerms.every((searchTerm: string) => {
            return searchableText.includes(searchTerm);
          });
        });
      }
    }
  }

  private getSearchableText(value: Object, columns: Array<string>): string {
    let searchableText: string = columns.reduce(
      (accumulatedValue: string, column: string) => {
        return accumulatedValue + value[column] + ' ';
      }, '');

    return searchableText.trim();
  }
}
