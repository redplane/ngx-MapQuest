import {NgModule} from '@angular/core';
import {ComponentExamplesPageComponent} from './component-examples-page.component';
import {ComponentExamplesPageRoutingModule} from './component-examples-page-routing.module';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    ComponentExamplesPageRoutingModule,
    CommonModule,
    TranslateModule
  ],
  declarations: [
    ComponentExamplesPageComponent
  ],
  exports: [
    ComponentExamplesPageComponent
  ]
})
export class ComponentExamplesPageModule {

}
