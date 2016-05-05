import { Pipe, PipeTransform } from '@angular/core';
import { IInMessage } from '../interfaces/IInMessage';
import { InMessagesHelper } from '../services/InMessagesHelper';

@Pipe({
  name: 'inValidationErrors'
})
export class InValidationErrorsPipe implements PipeTransform {
  private messagesHelper: InMessagesHelper;

  constructor(messagesHelper: InMessagesHelper) {
    this.messagesHelper = messagesHelper;
  }

  transform(value: { [key: string]: any }): Array<IInMessage> {
    if (value) {
      let keys = Object.keys(value);

      return keys.reduce((messages, key) => {
        value[key].type = 'error';

        messages.push(value[key]);

        return messages;
      }, []);
    }
  }
}
