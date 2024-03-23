import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { GuardModule } from '../guards/guard.module';
import { ServiceModule } from '../services/service.module';
import { MainLayoutComponent } from './cores/main-layout/main-layout.component';
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
        loadChildren: () =>
          import(
            './features/pages/place-search-page/place-search-page.module'
          ).then((m) => m.PlaceSearchPageModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('./features/pages/home-page/home-page.module').then(
            (m) => m.HomePageModule
          ),
      },
    ],
  },
];

//#endregion

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule, // required animations module
    HttpClientModule,

    // Application modules.
    GuardModule.forRoot(),
    ServiceModule.forRoot(),
    RouterModule.forRoot(routes, {
      enableTracing: false,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent],
})
export class AppRouteModule {}
