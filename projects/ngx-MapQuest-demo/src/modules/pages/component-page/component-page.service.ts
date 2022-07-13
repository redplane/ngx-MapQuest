import {IComponentPageService} from '../../../services/interfaces/component-page-service.interface';
import {Inject, Injectable} from '@angular/core';
import {mergeMap, Observable, of} from 'rxjs';
import {DetailedComponentViewModel} from '../../../view-models/examples/detailed-component.view-model';
import {PropertyViewModel} from '../../../view-models/examples/property.view-model';
import {EventViewModel} from '../../../view-models/examples/event.view-model';
import {UseCaseViewModel} from '../../../view-models/examples/use-case.view-model';
import {HttpClient} from '@angular/common/http';
import {APP_SETTINGS_SERVICE} from '../../../constants/injectors';
import {IAppSettingsService} from '../../../services/interfaces/app-settings-service.interface';

@Injectable()
export class ComponentPageService implements IComponentPageService {

  //#region Constructor

  public constructor(
    @Inject(APP_SETTINGS_SERVICE) protected readonly _appSettingsService: IAppSettingsService,
    protected readonly _httpClient: HttpClient) {
  }

  //#endregion

  //#region Methods

  public getComponentAsync(componentName: string)
    : Observable<DetailedComponentViewModel> {

    return this._appSettingsService.getSettingsAsync()
      .pipe(
        mergeMap(appSettings => {
          const fullUrl = `${appSettings.apiUrl}/component/${componentName}`;
          return this._httpClient.get<DetailedComponentViewModel>(fullUrl);
        })
      );
  }

  //#endregion

}
