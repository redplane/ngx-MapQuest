import {IContentPageService} from '../../../services/interfaces/content-page-service.interface';
import {Inject, Injectable} from '@angular/core';
import {mergeMap, Observable, of} from 'rxjs';
import {ContentTitleViewModel} from '../../../view-models/content-pages/content-title.view-model';
import {ContentSectionViewModel} from '../../../view-models/content-pages/content-section.view-model';
import {HttpClient} from '@angular/common/http';
import {APP_SETTINGS_SERVICE} from '../../../constants/injectors';
import {IAppSettingsService} from '../../../services/interfaces/app-settings-service.interface';
import {AppSettings} from '../../../models/app-settings';

@Injectable()
export class HomePageService implements IContentPageService {

  //#region Constructor

  public constructor(
    @Inject(APP_SETTINGS_SERVICE) protected readonly _appSettingsService: IAppSettingsService,
    protected readonly _httpClient: HttpClient) {
  }

  //#endregion

  //#region Methods

  public getTitleAsync(): Observable<ContentTitleViewModel> {
    return this._appSettingsService.getSettingsAsync()
      .pipe(
        mergeMap((appSettings: AppSettings) => {
          const fullUrl = `${appSettings.apiUrl}/home/title`;
          return this._httpClient.get<ContentTitleViewModel>(fullUrl);
        })
      );
  }

  public getSectionsAsync(): Observable<ContentSectionViewModel[]> {
    return this._appSettingsService.getSettingsAsync()
      .pipe(
        mergeMap((appSettings: AppSettings) => {
          const fullUrl = `${appSettings.apiUrl}/home/sections`;
          return this._httpClient.get<ContentSectionViewModel[]>(fullUrl);
        })
      );
  }

  //#endregion

}
