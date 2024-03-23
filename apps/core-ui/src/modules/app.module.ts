import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRouteModule } from './app-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../factories/ngx-translate.factory';
import { HttpClient } from '@angular/common/http';
import { MessageBusModule } from '@message-bus/core';
import { appSettingFactory } from '../factories/app-setting.factory';
import { MainLayoutModule } from './cores/main-layout/main-layout.module';
import { AppProvider } from '../providers/app-provider/app.provider';
import { AppProviderModule } from '../providers/app-provider/app-provider.module';
import { PROVIDER__APP } from '../constants/app-injection-tokens';

//#region Module declaration

@NgModule({
  declarations: [],
  imports: [
    AppProviderModule,
    AppRouteModule,

    // Message bus registration.
    MessageBusModule.forRoot(),
    MainLayoutModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appSettingFactory,
      multi: true,
      deps: [PROVIDER__APP],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

//#endregion
