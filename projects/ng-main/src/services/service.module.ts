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
import {MAP_QUEST_KEY_RESOLVER_PROVIDER} from 'ngx-map-quest';
import {MqMapKeyResolver} from './implementations/mq-map-key.resolver';

@NgModule({})

export class ServiceModule {

  //#region Methods

  static forRoot(): ModuleWithProviders<ServiceModule> {
    return {
      ngModule: ServiceModule,
      providers: [
        {provide: USER_SERVICE_INJECTION_TOKEN, useClass: AccountService},
        {provide: AUTHENTICATION_SERVICE_INJECTION_TOKEN, useClass: AuthenticationService},
        {provide: UI_SERVICE_INJECTION_TOKEN, useClass: UiService},
        {
          provide: MAP_QUEST_KEY_RESOLVER_PROVIDER,
          useClass: MqMapKeyResolver
        }
      ]
    };
  }

  //#endregion
}


