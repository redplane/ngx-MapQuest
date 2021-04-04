import {Directive, Input} from '@angular/core';
import {LatLngExpression, Point, PolylineOptions} from 'leaflet';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'mq-polygon'
})
export class MqPolygonDirective {

  //#region Properties

  // Points in the polygon
  @Input()
  public points: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][];

  @Input()
  public options: PolylineOptions;

  //#endregion

}
