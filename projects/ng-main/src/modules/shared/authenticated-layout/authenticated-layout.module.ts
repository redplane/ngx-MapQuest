import {NgModule} from '@angular/core';
import {AuthenticatedLayoutComponent} from './authenticated-layout.component';
import {NavigationBarModule} from './navigation-bar/navigation-bar.module';
import {SideBarModule} from './side-bar/side-bar.module';
import {RouterModule} from '@angular/router';
import {FooterBarModule} from './footer-bar/footer-bar.module';

@NgModule({
  imports: [
    RouterModule,
    NavigationBarModule,
    SideBarModule,
    FooterBarModule
  ],
  declarations: [
    AuthenticatedLayoutComponent
  ],
  exports: [
    AuthenticatedLayoutComponent
  ]
})
export class AuthenticatedLayoutModule {

}
