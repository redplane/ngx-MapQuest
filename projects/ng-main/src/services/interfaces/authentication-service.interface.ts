/**
 * Created by Linh Nguyen on 6/7/2017.
 */
import {LoginResultViewModel} from "../../view-models/login-result-view-model";

export interface IAuthenticationService {

  //#region Methods

  /*
   * Save identity into local storage.
   * */
  setAuthorization(identity: LoginResultViewModel): void;

  /*
   * Get identity in local storage.
   * */
  getAuthorization(): LoginResultViewModel;

  /*
   * Remove identity from cache.
   * */
  clearIdentity(): void;

  /*
   * Get authorization token from local storage.
   * */
  getAuthorization(): LoginResultViewModel;

  /*
   * Check whether authorization token is valid or not.
   * */
  isAuthorizationValid(authorizationToken: LoginResultViewModel): boolean;

  /*
  * Redirect to login page.
  * */
  redirectToLogin(): void;

//#endregion
}
