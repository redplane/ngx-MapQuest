import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComponentExamplesPageComponent} from './component-examples-page.component';

const routes: Routes = [
  {
    path: '',
    component: ComponentExamplesPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ComponentExamplesPageRoutingModule {

}
