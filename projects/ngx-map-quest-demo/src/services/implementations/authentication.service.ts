/**
 * Created by Linh Nguyen on 6/7/2017.
 */
import {Injectable} from '@angular/core';
import {LoginResultViewModel} from '../../view-models/login-result-view-model';
import {Router} from '@angular/router';
import {IAuthenticationService} from '../interfaces/authentication-service.interface';
import {AppSettingConstant} from '../../constants/app-settings.constant';

@Injectable()
export class AuthenticationService implements IAuthenticationService {

  //#region Constructor

  /*
  * Initiate component with injectors.
  * */
  public constructor(protected router: Router) {

  }

  //#endregion

  //#region Methods

  /*
   * Store identity into local storage.
   * */
  public setAuthorization(identity: LoginResultViewModel): void {
    localStorage.setItem(AppSettingConstant.identityStorage, JSON.stringify(identity));
  }

  /*
   * Remove identity from cache.
   * */
  public clearIdentity(): void {
    localStorage.removeItem(AppSettingConstant.identityStorage);
  }

  /*
  * Get authorization token from local storage.
  * */
  public getAuthorization(): LoginResultViewModel {

    // Get authorization token from local storage.
    const authorizationToken = localStorage.getItem(AppSettingConstant.identityStorage);

    // Authorization is invalid.
    if (authorizationToken == null || authorizationToken.length < 1) {
      return null;
    }

    return <LoginResultViewModel>JSON.parse(authorizationToken);
  };

  /*
  * Check whether authorization token is valid or not.
  * */
  public isAuthorizationValid(authorizationToken: LoginResultViewModel): boolean {

    // Token is not valid.
    if (authorizationToken == null) {
      return false;
    }

    // Authorization token code is not valid.
    if (authorizationToken.code == null || authorizationToken.code.length < 1) {
      return false;
    }

    // // Authorization token has been expired.
    // if (authorizationToken.expire >= Date.now())
    //   return false;

    return true;
  };

  /*
  * Redirect to login page.
  * */
  public redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  //#endregion
}
