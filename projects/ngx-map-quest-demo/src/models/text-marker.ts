import {MqTextMarkerOptions} from 'ngx-map-quest';

export class TextMarker {

  //#region Properties

  public constructor(public readonly id: string,
                     public readonly coordinate: L.LatLngExpression,
                     public readonly options?: MqTextMarkerOptions) {
  }

  //#endregion

}
