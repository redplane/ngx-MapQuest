import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRouteModule} from './app-routing.module';
import {AppSettingsService} from '../services/implementations/app-settings.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../factories/ngx-translate.factory';
import {HttpClient} from '@angular/common/http';
import {MessageBusModule} from '@message-bus/core';
import {appSettingsServiceFactory} from '../factories/app-setting.factory';
import {MainLayoutModule} from './shared/main-layout/main-layout.module';
import {APP_SETTINGS_SERVICE} from '../constants/injectors';

//#region Module declaration

@NgModule({
  declarations: [],
  imports: [
    AppRouteModule,

    // Message bus registration.
    MessageBusModule.forRoot(),
    MainLayoutModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: APP_SETTINGS_SERVICE,
      useClass: AppSettingsService
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appSettingsServiceFactory,
      multi: true,
      deps: [APP_SETTINGS_SERVICE]
    }
  ],
  bootstrap: [AppComponent]
})


export class AppModule {
}

//#endregion
