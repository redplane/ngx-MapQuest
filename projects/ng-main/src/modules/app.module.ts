import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRouteModule} from './app.route';
import {AppConfigService} from '../services/implementations/app-config.service';
import {NgRxMessageBusModule} from 'ngrx-message-bus';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../factories/ngx-translate.factory';
import {HttpClient} from '@angular/common/http';

//#region Factories

export function appConfigServiceFactory(appConfigService: AppConfigService) {
  return () => appConfigService.loadConfigurationFromFile();
}

//#endregion

//#region Module declaration

@NgModule({
  declarations: [],
  imports: [
    AppRouteModule,
    // Message bus settings
    NgRxMessageBusModule.forRoot({
      subscriptionAttemptMode: 'infinite'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appConfigServiceFactory,
      multi: true,
      deps: [AppConfigService]
    }
  ],
  bootstrap: [AppComponent]
})


export class AppModule {
}

//#endregion
