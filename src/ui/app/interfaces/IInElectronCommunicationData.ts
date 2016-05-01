export interface IInElectronCommunicationData<T> {
  event: Event;
  type: string;
  message: T;
}
