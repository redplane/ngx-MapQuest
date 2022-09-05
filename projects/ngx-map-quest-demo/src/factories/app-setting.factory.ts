import {AppConfigService} from '../services/implementations/app-config.service';

export function appConfigServiceFactory(appConfigService: AppConfigService) {
  return () => appConfigService.loadSettingsAsync();
}

