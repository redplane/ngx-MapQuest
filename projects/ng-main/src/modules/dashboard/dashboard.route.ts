import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {AuthenticatedLayoutComponent} from '../shared/authenticated-layout/authenticated-layout.component';
import {IsAuthorizedGuard} from '../../guards/is-authorized-guard';
import {ProfileResolve} from '../../resolves/profile.resolve';
import {AuthenticatedLayoutModule} from '../shared/authenticated-layout/authenticated-layout.module';

//#region Route configuration

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: AuthenticatedLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full'
      }
    ]
  }
];


//#endregion

//#region Module configuration

@NgModule({
  imports: [
    AuthenticatedLayoutModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRouteModule {
}

//#endregion
