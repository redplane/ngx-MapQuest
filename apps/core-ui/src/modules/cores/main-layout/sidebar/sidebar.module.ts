import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidebarComponent],
  imports: [TranslateModule, RouterModule],
  exports: [SidebarComponent],
})
export class SidebarModule {}
