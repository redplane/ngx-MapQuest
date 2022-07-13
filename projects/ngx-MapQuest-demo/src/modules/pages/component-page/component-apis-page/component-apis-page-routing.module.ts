import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComponentApisPageComponent} from './component-apis-page.component';

const routes: Routes = [
  {
    path: '',
    component: ComponentApisPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ComponentApisPageRoutingModule {

}
