import {Marker} from 'leaflet';

export class MqMarker {

  //#region Properties

  public lastModifiedTime?: number;

  //#endregion

  //#region Constructor

  public constructor(public readonly id: string,
                     public readonly marker: Marker) {
    this.lastModifiedTime = null;
  }

  //#endregion

}
