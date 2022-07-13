import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComponentPageComponent} from './component-page.component';

const routes: Routes = [
  {
    path: '',
    component: ComponentPageComponent,
    children: [
      {
        path: 'examples',
        loadChildren: () => import('./component-examples-page/component-examples-page.module')
          .then(m => m.ComponentExamplesPageModule)
      },
      {
        path: '',
        loadChildren: () => import('./component-apis-page/component-apis-page.module')
          .then(m => m.ComponentApisPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ComponentPageRoutingModule {

}
