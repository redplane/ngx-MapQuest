import {IAppSettingsService} from '../services/interfaces/app-settings-service.interface';

export function appSettingsServiceFactory(appSettingsService: IAppSettingsService) {
  return () => appSettingsService.getSettingsAsync();
}

