import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComponentPageComponent} from './component-page.component';

const routes: Routes = [
  {
    path: '',
    component: ComponentPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ComponentPageRoutingModule {

}
