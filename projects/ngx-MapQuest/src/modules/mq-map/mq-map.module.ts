import {NgModule} from '@angular/core';
import {MqMapComponent} from './mq-map.component';
import {MqMarkerDirective} from './mq-marker.directive';
import {MqCircleDirective} from './mq-circle.directive';
import {MqPolygonDirective} from './mq-polygon.directive';
import {MqTextMarkerDirective} from './mq-text-marker.directive';

@NgModule({
  declarations: [
    MqMapComponent,
    MqMarkerDirective,
    MqTextMarkerDirective,
    MqCircleDirective,
    MqPolygonDirective
  ],
  exports: [
    MqMapComponent,
    MqMarkerDirective,
    MqTextMarkerDirective,
    MqCircleDirective,
    MqPolygonDirective
  ]
})
export class MqMapModule {

}
