import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentPageComponent} from '../../shared/content-page/content-page.component';

const routes: Routes = [
  {
    path: '',
    component: ContentPageComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class HomePageRoutingModule {

}
