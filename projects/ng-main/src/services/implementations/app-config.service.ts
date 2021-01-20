import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from '../../models/app-settings';

@Injectable()
export class AppConfigService {

  //#region Properties

  private _appConfiguration: AppSettings;

  //#endregion

  //#region Constructors

  constructor(public httpClient: HttpClient) {

  }

  //#endregion

  //#region Application configuration

  /*
  * Load app configuration from json file.
  * */
  public loadSettingsAsync(): Promise<AppSettings> {
    return this.httpClient
      .get('/assets//appsettings.json')
      .toPromise()
      .then(data => {
        console.log(data);
        let options = <AppSettings> data;
        this._appConfiguration = options;
        return options;
      });
  }

  /*
  * Load configuration from cache.
  * */
  public loadConfigurationFromCache(): AppSettings {
    return this._appConfiguration;
  }

  //#endregion
}
