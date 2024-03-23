import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceSearchPageComponent } from './place-search-page.component';

const routes: Routes = [
  {
    path: '',
    component: PlaceSearchPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PlaceSearchPageRoutingModule {}
