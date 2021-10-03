import {AppConfigService} from '../services/implementations/app-config.service';
import {registerLocaleData} from '@angular/common';
import {AppSettings} from '../models/app-settings';

export function appConfigServiceFactory(appConfigService: AppConfigService) {
  return () => appConfigService.loadSettingsAsync()
    .then((settings: AppSettings) => {

      // Get locale.
      const locale = settings.locale;
      const parts = locale.split('-');
      let selectedLocale = 'en';

      if (parts.length) {
        selectedLocale = parts[0];
      }

      return loadLocaleAsync(selectedLocale)
        .then(_ => settings);
    });
}

function loadLocaleAsync(localeId: string): Promise<any> {
  return import(
    `@angular/common/locales/${localeId}.js`
    ).then(module => registerLocaleData(module.default));
}
