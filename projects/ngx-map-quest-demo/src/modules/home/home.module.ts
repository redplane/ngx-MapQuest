import {HomeComponent} from './home.component';
import {NgModule} from '@angular/core';
import {HomeRoutingModule} from './home-routing.module';
import {
  LocatorControlModule,
  MqMapModule, MqMarkerClusterGroupModule,
  NavigationControlModule,
  SatelliteControlModule,
  SearchControlModule,
  TrafficControlModule
} from 'ngx-map-quest';
import {CommonModule} from '@angular/common';
import {MqImageLayerModule} from 'ngx-map-quest';

//#region Routes declaration


//#endregion

//#region Module declaration

@NgModule({
  imports: [
    MqMapModule,
    HomeRoutingModule,
    CommonModule,

    SatelliteControlModule,
    NavigationControlModule,
    TrafficControlModule,
    LocatorControlModule,
    SearchControlModule,
    MqImageLayerModule,
    MqMarkerClusterGroupModule
  ],
  declarations: [
    HomeComponent
  ]
})

export class HomeModule {
}

//#endregion
