import {NgModule} from '@angular/core';
import {ContentPageComponent} from './content-page.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    ContentPageComponent
  ],
  imports: [
    TranslateModule,
    RouterModule,
    CommonModule
  ],
  exports: [
    ContentPageComponent
  ]
})
export class ContentPageModule {
}
