import { NgModule } from '@angular/core';
import { PlaceSearchPageComponent } from './place-search-page.component';
import { PlaceSearchPageRoutingModule } from './place-search-page-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    PlaceSearchPageRoutingModule,
    TranslateModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [PlaceSearchPageComponent],
  exports: [PlaceSearchPageComponent],
})
export class PlaceSearchPageModule {}
