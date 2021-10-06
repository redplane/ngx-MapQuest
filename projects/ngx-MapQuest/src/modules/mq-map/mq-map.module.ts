import {NgModule} from '@angular/core';
import {MqMapComponent} from './mq-map.component';
import {MqMarkerDirective} from './mq-marker.directive';
import {MqCircleDirective} from './mq-circle.directive';
import {MqPolygonDirective} from './mq-polygon.directive';
import {MqTextMarkerDirective} from './mq-text-marker.directive';
import {MqMarkerPopupDirective} from './mq-marker-popup.directive';
import {MqFileLoaderService} from '../../services/mq-file-loader.service';
import {MqHeatLayerDirective} from './mq-heat-layer.directive';

@NgModule({
  declarations: [
    MqMapComponent,
    MqMarkerDirective,
    MqTextMarkerDirective,
    MqCircleDirective,
    MqPolygonDirective,
    MqMarkerPopupDirective,
    MqHeatLayerDirective
  ],
  exports: [
    MqMapComponent,
    MqMarkerDirective,
    MqTextMarkerDirective,
    MqCircleDirective,
    MqPolygonDirective,
    MqMarkerPopupDirective,
    MqHeatLayerDirective
  ],
  providers: [
    MqFileLoaderService
  ]
})
export class MqMapModule {

}
