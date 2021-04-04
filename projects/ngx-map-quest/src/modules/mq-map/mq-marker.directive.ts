import {Directive, Input} from '@angular/core';
import {LatLngExpression, MarkerOptions} from 'leaflet';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'mq-marker'
})
export class MqMarkerDirective {

  //#region Properties

  @Input()
  public coordinate: LatLngExpression;

  @Input()
  public options?: MarkerOptions;

  //#endregion

  //#region Constructor

  public constructor() {
  }

  //#endregion

  //#region Methods

  //#endregion
}
