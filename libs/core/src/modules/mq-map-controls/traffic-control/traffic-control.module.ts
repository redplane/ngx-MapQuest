import { NgModule } from '@angular/core';
import { TrafficControlDirective } from './traffic-control.directive';

@NgModule({
  declarations: [TrafficControlDirective],
  exports: [TrafficControlDirective],
})
export class TrafficControlModule {}
