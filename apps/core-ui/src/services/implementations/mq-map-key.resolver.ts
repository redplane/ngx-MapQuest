import { Inject, Injectable } from '@angular/core';
import { IMqMapKeyResolver } from 'ngx-map-quest';
import { map, Observable, of } from 'rxjs';
import { PROVIDER__APP } from '../../constants/app-injection-tokens';
import { IAppProvider } from '../../providers/app-provider/app-provider.interface';

@Injectable()
export class MqMapKeyResolver implements IMqMapKeyResolver {
  //#region Constructor

  public constructor(
    @Inject(PROVIDER__APP) private readonly __appProvider: IAppProvider
  ) {}

  //#endregion

  //#region Methods

  public getMapQuestKeyAsync(): Observable<string> {
    return this.__appProvider
      .getSettingsAsync()
      .pipe(map((appSetting) => appSetting.mapQuestKey));
  }

  //#endregion
}
