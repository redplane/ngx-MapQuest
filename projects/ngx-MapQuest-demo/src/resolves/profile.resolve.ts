import {ProfileViewModel} from '../view-models/profile.view-model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Inject, Injectable} from '@angular/core';
import {IAccountService} from '../services/interfaces/account-service.interface';
import {USER_SERVICE_INJECTION_TOKEN} from '../constants/injection-token.constant';

@Injectable()
export class ProfileResolve implements Resolve<ProfileViewModel> {

  //#region Constructors

  /*
  * Initialize resolve with injectors.
  * */
  public constructor(@Inject(USER_SERVICE_INJECTION_TOKEN) public accountService: IAccountService) {

  }

  //#endregion

  //#region Methods

  /*
  * Resolve route data.
  * */
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProfileViewModel> | Promise<ProfileViewModel> | ProfileViewModel {
    return this.accountService.getProfile();
  }

  //#endregion

}
