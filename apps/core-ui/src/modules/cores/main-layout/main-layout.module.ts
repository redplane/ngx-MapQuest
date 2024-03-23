import { NgModule } from '@angular/core';
import { MainLayoutComponent } from './main-layout.component';
import { NavigationBarModule } from './navigation-bar/navigation-bar.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { RouterModule } from '@angular/router';
import { FooterBarModule } from './footer-bar/footer-bar.module';

@NgModule({
  imports: [RouterModule, NavigationBarModule, SidebarModule, FooterBarModule],
  declarations: [MainLayoutComponent],
  exports: [MainLayoutComponent],
})
export class MainLayoutModule {}
