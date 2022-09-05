import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlaceSearchDemoComponent} from './place-search-demo.component';

const routes: Routes = [
  {
    path: '',
    component: PlaceSearchDemoComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class PlaceSearchDemoRoutingModule {
}
