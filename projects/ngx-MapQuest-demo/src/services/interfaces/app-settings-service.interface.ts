import {Observable} from 'rxjs';
import {AppSettings} from '../../models/app-settings';

export interface IAppSettingsService {

  //#region Methods

  getSettingsAsync(): Observable<AppSettings>;

  //#endregion

}
