import {NgModule} from '@angular/core';
import {MasterLayoutComponent} from './master-layout.component';
import {NavigationBarModule} from './navigation-bar/navigation-bar.module';
import {SidebarModule} from './sidebar/sidebar.module';
import {RouterModule} from '@angular/router';
import {FooterBarModule} from './footer-bar/footer-bar.module';

@NgModule({
  imports: [
    RouterModule,
    NavigationBarModule,
    SidebarModule,
    FooterBarModule
  ],
  declarations: [
    MasterLayoutComponent
  ],
  exports: [
    MasterLayoutComponent
  ]
})
export class MasterLayoutModule {

}
