import {InjectionToken} from '@angular/core';
import {IContentPageService} from '../services/interfaces/content-page-service.interface';
import {IComponentsPageService} from '../services/interfaces/components-page-service.interface';
import {IComponentPageService} from '../services/interfaces/component-page-service.interface';
import {IAppSettingsService} from '../services/interfaces/app-settings-service.interface';

export const CONTENT_PAGE_SERVICE = new InjectionToken<IContentPageService>('CONTENT_PAGE_SERVICE');
export const COMPONENTS_PAGE_SERVICE = new InjectionToken<IComponentsPageService>('COMPONENTS_PAGE_SERVICE');
export const COMPONENT_PAGE_SERVICE = new InjectionToken<IComponentPageService>('COMPONENT_PAGE_SERVICE');
export const APP_SETTINGS_SERVICE = new InjectionToken<IAppSettingsService>('APP_SETTINGS_SERVICE');
