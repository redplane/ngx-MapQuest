import {NgModule} from '@angular/core';
import {NavigationControlDirective} from './navigation-control.directive';

@NgModule({
  declarations: [
    NavigationControlDirective
  ],
  exports: [
    NavigationControlDirective
  ]
})
export class NavigationControlModule {

}
