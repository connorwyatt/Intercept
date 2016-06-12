import { IInAPIMessages } from './IInAPIMessages';

export interface IInAPIData<T> {
  data?: {
    [key: string]: T;
  };
  meta?: {
    messages?: IInAPIMessages;
  };
}
