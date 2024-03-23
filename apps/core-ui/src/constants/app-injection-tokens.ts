import { InjectionToken } from '@angular/core';
import { IUiService } from '../services/interfaces/ui-service.interface';
import { IAppProvider } from '../providers/app-provider/app-provider.interface';

export const SERVICE__UI = new InjectionToken<IUiService>('SERVICE__UI');

export const PROVIDER__APP = new InjectionToken<IAppProvider>('PROVIDER__APP');
