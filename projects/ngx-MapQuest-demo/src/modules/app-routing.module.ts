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
