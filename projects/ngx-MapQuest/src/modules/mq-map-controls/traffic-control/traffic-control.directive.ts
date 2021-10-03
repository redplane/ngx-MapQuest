import {MqMapControl} from '../mq-map-control';
import {TrafficControlOptions} from '../../../models/traffic-control-options';
import {Directive} from '@angular/core';
import {MqMapService} from '../../../services/mq-map.service';
import {MqMapComponent} from '../../mq-map/mq-map.component';

declare var L: any;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'mq-map mq-control-traffic'
})
export class TrafficControlDirective extends MqMapControl<TrafficControlOptions> {

  //#region Constructor

  public constructor(protected readonly mqMap: MqMapComponent,
                     protected readonly mqMapService: MqMapService) {
    super(mqMap, mqMapService);
  }

  //#endregion

  //#region Methods

  protected addControl(): L.Control {
    return L.mapquest.trafficControl(this.options);
  }

  //#endregion
}
