import {NgModule} from '@angular/core';
import {PlaceSearchDemoComponent} from './place-search-demo.component';
import {PlaceSearchDemoRoutingModule} from './place-search-demo-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    PlaceSearchDemoRoutingModule,
    TranslateModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    PlaceSearchDemoComponent
  ],
  exports: [
    PlaceSearchDemoComponent
  ]
})
export class PlaceSearchDemoModule {

}
