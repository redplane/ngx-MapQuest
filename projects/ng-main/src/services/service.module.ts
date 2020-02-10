import {NgModule, ModuleWithProviders} from '@angular/core';
import {IAccountService} from './interfaces/account-service.interface';
import {AccountService} from './implementations/account.service';
import {IAuthenticationService} from './interfaces/authentication-service.interface';
import {AuthenticationService} from './implementations/authentication.service';
import {UiService} from './implementations/ui.service';
import {
  AUTHENTICATION_SERVICE_INJECTION_TOKEN,
  UI_SERVICE_INJECTION_TOKEN,
  USER_SERVICE_INJECTION_TOKEN
} from '../constants/injection-token.constant';

@NgModule({})

export class ServiceModule {

  //#region Methods

  static forRoot(): ModuleWithProviders<ServiceModule> {
    return {
      ngModule: ServiceModule,
      providers: [
        {provide: USER_SERVICE_INJECTION_TOKEN, useClass: AccountService},
        {provide: AUTHENTICATION_SERVICE_INJECTION_TOKEN, useClass: AuthenticationService},
        {provide: UI_SERVICE_INJECTION_TOKEN, useClass: UiService}
      ]
    };
  }

  //#endregion
}


