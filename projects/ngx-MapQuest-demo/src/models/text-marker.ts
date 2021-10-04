import {MqTextMarkerOptions} from 'ngx-MapQuest';

export class TextMarker {

  //#region Properties

  public constructor(public readonly id: string,
                     public readonly coordinate: L.LatLngExpression,
                     public readonly options?: MqTextMarkerOptions) {
  }

  //#endregion

}
