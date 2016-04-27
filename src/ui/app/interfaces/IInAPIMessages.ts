import { IInMessage } from './IInMessage';

export interface IInAPIMessages {
  information?: Array<IInMessage>;
  warning?: Array<IInMessage>;
  errors?: Array<IInMessage>;
}
