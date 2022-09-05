import {Directive} from '@angular/core';
import {MqMapControl} from '../mq-map-control';
import {SearchControlOptions} from '../../../models/search-control-options';
import {MqMapComponent} from '../../mq-map/mq-map.component';
import {MqMapService} from '../../../services/mq-map.service';

declare var L: any;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'mq-map mq-control-search'
})
export class SearchControlDirective extends MqMapControl<SearchControlOptions> {

  //#region Constructor

  public constructor(protected readonly mqMap: MqMapComponent,
                     protected readonly mqMapService: MqMapService) {
    super(mqMap, mqMapService);
  }

  //#endregion

  //#region Methods

  protected addControl(): L.Control {
    return L.mapquest.searchControl(this.options);
  }

  //#endregion
}
