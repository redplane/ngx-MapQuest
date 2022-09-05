import {Polygon} from 'leaflet';

export class MqPolygon {

  //#region Properties

  public lastModifiedTime?: number;

  //#endregion

  //#region Constructor

  public constructor(public readonly id: string,
                     public readonly polygon: Polygon) {
    this.lastModifiedTime = null;
  }

  //#endregion
}
