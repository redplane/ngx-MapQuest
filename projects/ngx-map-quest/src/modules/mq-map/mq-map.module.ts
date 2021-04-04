import {NgModule} from '@angular/core';
import {MqMapComponent} from './mq-map.component';
import {MqMarkerDirective} from './mq-marker.directive';
import {MqCircleDirective} from './mq-circle.directive';
import {MqPolygonDirective} from './mq-polygon.directive';

@NgModule({
  declarations: [
    MqMapComponent,
    MqMarkerDirective,
    MqCircleDirective,
    MqPolygonDirective
  ],
  exports: [
    MqMapComponent,
    MqMarkerDirective,
    MqCircleDirective,
    MqPolygonDirective
  ]
})
export class MqMapModule {

}
