export abstract class MqSystemFile {
  //#region Properties

  public readonly kind: 'script' | 'css';

  //#endregion

  //#region Properties

  protected constructor(kind: 'script' | 'css') {
    this.kind = kind;
  }

  //#endregion
}
