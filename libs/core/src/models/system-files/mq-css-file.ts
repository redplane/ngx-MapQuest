import { MqSystemFile } from './mq-system-file';

export class MqCssFile extends MqSystemFile {
  //#region Constructor

  public constructor(public readonly href: string) {
    super('css');
  }

  //#endregion
}
