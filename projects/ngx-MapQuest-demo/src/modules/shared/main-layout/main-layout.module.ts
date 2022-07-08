import {NgModule} from '@angular/core';
import {MainLayoutComponent} from './main-layout.component';
import {SidebarModule} from './sidebar/sidebar.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    SidebarModule
  ],
  declarations: [
    MainLayoutComponent
  ],
  exports: [
    MainLayoutComponent
  ]
})
export class MainLayoutModule {

}
