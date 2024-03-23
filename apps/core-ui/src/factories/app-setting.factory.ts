import { IAppProvider } from '../providers/app-provider/app-provider.interface';
import { firstValueFrom } from 'rxjs';

export function appSettingFactory(appProvider: IAppProvider) {
  return () => firstValueFrom(appProvider.getSettingsAsync());
}
