import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login.component';
import {TranslateModule} from '@ngx-translate/core';

//#region Routes

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

//#endregion

//#region Module definitions

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TranslateModule.forChild()
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRouteModule {
}

//#endregion
