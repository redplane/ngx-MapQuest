export class MqTextMarker {

  //#region Properties

  public lastModifiedTime?: number;

  //#endregion

  //#region Constructor

  public constructor(public readonly id: string,
                     public readonly marker: any) {
    this.lastModifiedTime = null;
  }

  //#endregion

}
