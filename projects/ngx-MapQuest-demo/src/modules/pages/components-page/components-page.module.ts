import {NgModule} from '@angular/core';
import {ComponentsPageComponent} from './components-page.component';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsPageRoutingModule} from './components-page-routing.module';
import {COMPONENTS_PAGE_SERVICE} from '../../../constants/injectors';
import {ComponentsPageService} from './components-page.service';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    ComponentsPageComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ComponentsPageRoutingModule,
    RouterModule
  ],
  exports: [
    ComponentsPageComponent
  ],
  providers: [
    {
      provide: COMPONENTS_PAGE_SERVICE,
      useClass: ComponentsPageService
    }
  ]
})
export class ComponentsPageModule {

}
