import { IInAPIMessages } from '../interfaces/IInAPIMessages';
import { IInMessage } from '../interfaces/IInMessage';

export enum MessageTypes {
  success = 'success',
  error = 'errors'
}

export class InMessagesHelper {
  public flattenMessages(messages: IInAPIMessages) {
    let messageTypes = Object.keys(messages);

    return messageTypes.reduce((flattenedMessages, messageType) => {
      messages[messageType].forEach((message: IInMessage) => {
        message.type = MessageTypes[messageType];

        flattenedMessages.push(message);
      });

      return flattenedMessages;
    }, []);
  }

  public getSaveMessage(): { [key: string]: Array<IInMessage> } {
    return {
      success: [{
        body: 'Saved successfully'
      }]
    };
  }
}
