import {NgModule} from '@angular/core';
import {MqImageLayerDirective} from './mq-image-layer.directive';

@NgModule({
  declarations: [
    MqImageLayerDirective
  ],
  exports: [
    MqImageLayerDirective
  ]
})
export class MqImageLayerModule {

}
