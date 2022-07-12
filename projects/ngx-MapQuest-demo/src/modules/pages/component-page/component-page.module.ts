import {NgModule} from '@angular/core';
import {ComponentPageComponent} from './component-page.component';
import {ComponentPageRoutingModule} from './component-page-routing.module';
import {CommonModule} from '@angular/common';
import {COMPONENT_PAGE_SERVICE} from '../../../constants/injectors';
import {ComponentPageService} from './component-page.service';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    ComponentPageRoutingModule,
    CommonModule,
    TranslateModule
  ],
  declarations: [
    ComponentPageComponent
  ],
  exports: [
    ComponentPageComponent
  ],
  providers: [
    {
      provide: COMPONENT_PAGE_SERVICE,
      useClass: ComponentPageService
    }
  ]
})
export class ComponentPageModule {

}
