import {NgModule} from '@angular/core';
import {SatelliteControlDirective} from './satellite-control.directive';

@NgModule({
  declarations: [
    SatelliteControlDirective
  ],
  exports: [
    SatelliteControlDirective
  ]
})
export class SatelliteControlModule {
}
