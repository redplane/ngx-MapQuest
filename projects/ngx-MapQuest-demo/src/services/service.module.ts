import {ModuleWithProviders, NgModule} from '@angular/core';
import {AccountService} from './implementations/account.service';
import {AuthenticationService} from './implementations/authentication.service';
import {UiService} from './implementations/ui.service';
import {
  AUTHENTICATION_SERVICE_INJECTION_TOKEN,
  UI_SERVICE_INJECTION_TOKEN,
  USER_SERVICE_INJECTION_TOKEN
} from '../constants/injection-token.constant';
import {MqMapKeyResolver} from './implementations/mq-map-key.resolver';
import {MarkerStorageService} from './implementations/marker-storage.service';
import {MAP_QUEST_KEY_RESOLVER_PROVIDER} from 'ngx-MapQuest';
import {TextMarkerStorageService} from './implementations/text-marker-storage.service';

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
        },
        MarkerStorageService,
        TextMarkerStorageService
      ]
    };
  }

  //#endregion
}


