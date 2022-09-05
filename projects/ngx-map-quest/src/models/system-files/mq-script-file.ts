import {MqSystemFile} from './mq-system-file';

export class MqScriptFile extends MqSystemFile {

  //#region Constructor

  constructor(public readonly src: string) {
    super('script');
  }

  //#endregion
}
