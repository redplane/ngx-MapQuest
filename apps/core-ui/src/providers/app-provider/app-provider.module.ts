import { NgModule } from '@angular/core';
import { PROVIDER__APP } from '../../constants/app-injection-tokens';
import { AppProvider } from './app.provider';

@NgModule({
  providers: [
    {
      provide: PROVIDER__APP,
      useClass: AppProvider,
    },
  ],
})
export class AppProviderModule {}
