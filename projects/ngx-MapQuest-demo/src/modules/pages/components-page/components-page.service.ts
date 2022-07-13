import {IComponentsPageService} from '../../../services/interfaces/components-page-service.interface';
import {Inject, Injectable} from '@angular/core';
import {ComponentViewModel} from '../../../view-models/examples/component.view-model';
import {mergeMap, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {APP_SETTINGS_SERVICE} from '../../../constants/injectors';
import {IAppSettingsService} from '../../../services/interfaces/app-settings-service.interface';
import {Params} from '@angular/router';

@Injectable()
export class ComponentsPageService implements IComponentsPageService {

  //#region Constructor

  public constructor(
    @Inject(APP_SETTINGS_SERVICE) protected readonly _appSettingsService: IAppSettingsService,
    protected readonly _httpClient: HttpClient) {
  }

  //#endregion

  //#region Methods

  public getComponentsAsync(): Observable<ComponentViewModel[]> {
    return this._appSettingsService.getSettingsAsync()
      .pipe(
        mergeMap(appSettings => {
          const fullUrl = `${appSettings.apiUrl}/components`;
          return this._httpClient.get<ComponentViewModel[]>(fullUrl)
        })
      );
  }

  //#endregion

}
