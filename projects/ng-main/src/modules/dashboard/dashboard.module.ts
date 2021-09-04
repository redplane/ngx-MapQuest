import {DashboardComponent} from './dashboard.component';
import {NgModule} from '@angular/core';
import {DashboardRouteModule} from './dashboard.route';
import {
  LocatorControlModule,
  MqMapModule,
  NavigationControlModule,
  SatelliteControlModule,
  SearchControlModule,
  TrafficControlModule
} from 'ngx-map-quest';
import {CommonModule} from '@angular/common';

//#region Routes declaration


//#endregion

//#region Module declaration

@NgModule({
  imports: [
    MqMapModule,
    DashboardRouteModule,
    CommonModule,

    SatelliteControlModule,
    NavigationControlModule,
    TrafficControlModule,
    LocatorControlModule,
    SearchControlModule
  ],
  declarations: [
    DashboardComponent
  ]
})

export class DashboardModule {
}

//#endregion
