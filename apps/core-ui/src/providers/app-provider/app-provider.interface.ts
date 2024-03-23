import { AppSetting } from '../../models/app-setting';
import { Observable } from 'rxjs';

export interface IAppProvider {
  //#region Methods

  getSettingsAsync(ignoreCache?: boolean): Observable<AppSetting>;

  //#endregion
}
