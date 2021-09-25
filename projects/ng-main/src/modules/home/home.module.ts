import {HomeComponent} from './home.component';
import {NgModule} from '@angular/core';
import {HomeRoutingModule} from './home-routing.module';
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
    HomeRoutingModule,
    CommonModule,

    SatelliteControlModule,
    NavigationControlModule,
    TrafficControlModule,
    LocatorControlModule,
    SearchControlModule
  ],
  declarations: [
    HomeComponent
  ]
})

export class HomeModule {
}

//#endregion
