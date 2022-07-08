import {InjectionToken} from '@angular/core';
import {IContentPageService} from '../services/interfaces/content-page-service.interface';

export const CONTENT_PAGE_SERVICE = new InjectionToken<IContentPageService>('CONTENT_PAGE_SERVICE');
