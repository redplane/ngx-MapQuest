import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from '../../models/app-settings';
import {IAppSettingsService} from '../interfaces/app-settings-service.interface';
import {map, Observable} from 'rxjs';

@Injectable()
export class AppSettingsService implements IAppSettingsService {

  //#region Properties

  private __appSettings: AppSettings;

  //#endregion

  //#region Constructors

  constructor(protected readonly _httpClient: HttpClient) {

  }

  //#endregion

  //#region Methods

  public getSettingsAsync(): Observable<AppSettings> {
    return this._httpClient
      .get('/assets/appsettings.json')
      .pipe(
        map(data => {
          let options = <AppSettings>data;
          this.__appSettings = options;
          return options;
        })
      );
  }

  //#endregion
}
