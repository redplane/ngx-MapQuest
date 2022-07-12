import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ServiceModule} from '../services/service.module';
import {MainLayoutComponent} from './shared/main-layout/main-layout.component';

//#endregion

//#region Properties

// Application routes configuration.
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'place-search',
        loadChildren: () => import('./place-search-demo/place-search-demo.module')
          .then(m => m.PlaceSearchDemoModule)
      },
      {
        path: 'components',
        loadChildren: () => import('./pages/components-page/components-page.module')
          .then(m => m.ComponentsPageModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./pages/component-page/component-page.module')
          .then(m => m.ComponentPageModule)
      },
      {
        path: '',
        loadChildren: () => import('./pages/home-page/home-page.module')
          .then(m => m.HomePageModule)
      }
    ]
  }
];

//#endregion

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule, // required animations module
    HttpClientModule,

    // Application modules.
    ServiceModule.forRoot(),
    RouterModule.forRoot(routes, {enableTracing: false, relativeLinkResolution: 'legacy'})
  ],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})

export class AppRouteModule {
}
