import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {GuardModule} from '../guards/guard.module';
import {ServiceModule} from '../services/service.module';
import {ResolveModule} from '../resolves/resolve.module';
import {MasterLayoutComponent} from './shared/master-layout/master-layout.component';

//#endregion

//#region Properties

// Application routes configuration.
export const routes: Routes = [
  {
    path: '',
    component: MasterLayoutComponent,
    children: [
      {
        path: 'place-search',
        loadChildren: () => import('./place-search-demo/place-search-demo.module')
          .then(m => m.PlaceSearchDemoModule)
      },
      {
        path: '',
        loadChildren: () => import('./home/home.module')
          .then(m => m.HomeModule)
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
    GuardModule.forRoot(),
    ServiceModule.forRoot(),
    ResolveModule.forRoot(),
    RouterModule.forRoot(routes, {enableTracing: false, relativeLinkResolution: 'legacy'})
  ],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})

export class AppRouteModule {
}
