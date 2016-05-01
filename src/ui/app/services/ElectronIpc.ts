export abstract class ElectronIPC {
  public abstract on(channel: string, callback: (event: Event, type: string, message: string) => void): void;
}
