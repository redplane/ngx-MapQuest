import {InjectionToken} from '@angular/core';
import {IAccountService} from '../services/interfaces/account-service.interface';
import {IAuthenticationService} from '../services/interfaces/authentication-service.interface';
import {IUiService} from '../services/interfaces/ui-service.interface';

export const USER_SERVICE_INJECTION_TOKEN = new InjectionToken<IAccountService>('Injection token of user service');
export const AUTHENTICATION_SERVICE_INJECTION_TOKEN = new InjectionToken<IAuthenticationService>('Injection token of authentication service');
export const UI_SERVICE_INJECTION_TOKEN = new InjectionToken<IUiService>('Injection token of ui service');
