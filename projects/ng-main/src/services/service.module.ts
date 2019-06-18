import {NgModule, ModuleWithProviders} from '@angular/core';
import {IAccountService} from './interfaces/account-service.interface';
import {AccountService} from './implementations/account.service';
import {IAuthenticationService} from './interfaces/authentication-service.interface';
import {AuthenticationService} from './implementations/authentication.service';
import {MessageBusService} from './implementations/message-bus.service';

@NgModule({})

export class ServiceModule {

  //#region Methods

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServiceModule,
      providers: [
        {provide: 'IAccountService', useClass: AccountService},
        {provide: 'IAuthenticationService', useClass: AuthenticationService},
        {provide: 'IMessageBusService', useClass: MessageBusService}
      ]
    };
  }

  //#endregion
}


