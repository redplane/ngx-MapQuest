import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ComponentApisPageComponent} from './component-apis-page.component';
import {ComponentApisPageRoutingModule} from './component-apis-page-routing.module';

@NgModule({
  declarations: [
    ComponentApisPageComponent
  ],
  imports: [
    ComponentApisPageRoutingModule,
    TranslateModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    ComponentApisPageComponent
  ]
})
export class ComponentApisPageModule {

}
