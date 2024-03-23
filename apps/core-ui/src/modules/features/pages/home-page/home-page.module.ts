import { HomePageComponent } from './home-page.component';
import { NgModule } from '@angular/core';
import { HomePageRoutingModule } from './home-page-routing.module';
import {
  LocatorControlModule,
  MqMapModule,
  MqMarkerClusterGroupModule,
  NavigationControlModule,
  SatelliteControlModule,
  SearchControlModule,
  TrafficControlModule,
} from 'ngx-map-quest';
import { CommonModule } from '@angular/common';
import { MqImageLayerModule } from 'ngx-map-quest';

//#region Routes declaration

//#endregion

//#region Module declaration

@NgModule({
  imports: [
    MqMapModule,
    HomePageRoutingModule,
    CommonModule,

    SatelliteControlModule,
    NavigationControlModule,
    TrafficControlModule,
    LocatorControlModule,
    SearchControlModule,
    MqImageLayerModule,
    MqMarkerClusterGroupModule,
  ],
  declarations: [HomePageComponent],
})
export class HomePageModule {}

//#endregion
