import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRouteModule} from './app-routing.module';
import {AppConfigService} from '../services/implementations/app-config.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../factories/ngx-translate.factory';
import {HttpClient} from '@angular/common/http';
import {NgRxMessageBusModule} from 'ngrx-message-bus';
import {appConfigServiceFactory} from '../factories/app-setting.factory';
import {MasterLayoutModule} from './shared/master-layout/master-layout.module';

//#region Module declaration

@NgModule({
  declarations: [],
  imports: [
    AppRouteModule,

    // Message bus registration.
    NgRxMessageBusModule.forRoot(),
    MasterLayoutModule,

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
