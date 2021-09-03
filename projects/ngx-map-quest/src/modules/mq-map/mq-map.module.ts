import {NgModule} from '@angular/core';
import {MqMapComponent} from './mq-map.component';
import {MqMarkerDirective} from './mq-marker.directive';
import {MqCircleDirective} from './mq-circle.directive';
import {MqPolygonDirective} from './mq-polygon.directive';
import {SatelliteControlDirective} from './controls/satellite-control.directive';
import {NavigationControlDirective} from './controls/navigation-control.directive';
import {TrafficControlDirective} from './controls/traffic-control.directive';
import {LocatorControlDirective} from './controls/locator-control.directive';

@NgModule({
  declarations: [
    MqMapComponent,
    MqMarkerDirective,
    MqCircleDirective,
    MqPolygonDirective,

    SatelliteControlDirective,
    NavigationControlDirective,
    TrafficControlDirective,
    LocatorControlDirective
  ],
  exports: [
    MqMapComponent,
    MqMarkerDirective,
    MqCircleDirective,
    MqPolygonDirective,

    SatelliteControlDirective,
    NavigationControlDirective,
    TrafficControlDirective,
    LocatorControlDirective
  ]
})
export class MqMapModule {

}
