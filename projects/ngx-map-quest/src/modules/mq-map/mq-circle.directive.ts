import {Directive, Input} from '@angular/core';
import {CircleMarkerOptions, LatLngExpression} from 'leaflet';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'mq-circle'
})
export class MqCircleDirective {

  //#region Properties

  @Input()
  public coordinate: LatLngExpression;

  @Input()
  public options?: CircleMarkerOptions;

  //#endregion

  //#region Constructor

  public constructor() {
  }

  //#endregion

  //#region Methods

  //#endregion
}
