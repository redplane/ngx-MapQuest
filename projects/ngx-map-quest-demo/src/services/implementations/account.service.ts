
import {of as observableOf, Observable} from 'rxjs';
import {IAccountService} from "../interfaces/account-service.interface";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ProfileViewModel} from "../../view-models/profile.view-model";

@Injectable()
export class AccountService implements IAccountService {

  //#region Constructor

  /*
  * Initiate service with injectors.
  * */
  public constructor(public httpClient: HttpClient) {

  }

  //#endregion

  //#region Methods

  /*
  * Get profile information.
  * */
  public getProfile(): Observable<ProfileViewModel> {
    let url = '/assets/user.json';
    let profile = new ProfileViewModel();
    profile.email = 'Email 01';
    profile.joinedTime = 0;
    profile.nickname = 'Nick name 01';
    profile.photoRelativeUrl = 'https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png';

    return observableOf(profile);
  }
  //#endregion

}
