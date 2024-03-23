import { CircleMarker } from 'leaflet';

export class MqCircle {
  //#region Constructor

  //#region Properties

  public lastModifiedTime?: number;

  //#endregion

  //#region Constructor

  public constructor(
    public readonly id: string,
    public readonly circle: CircleMarker
  ) {
    this.lastModifiedTime = null;
  }

  //#endregion

  //#endregion
}
