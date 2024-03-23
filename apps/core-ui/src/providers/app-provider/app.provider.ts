import { IAppProvider } from './app-provider.interface';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { AppSetting } from '../../models/app-setting';
import { environment } from '../../environments/environment';
import { merge as lodashMerge } from 'lodash-es';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppProvider implements IAppProvider {
  //#region Properties

  private __cache: AppSetting;

  private __loaded: boolean;

  //#endregion

  //#region Constructors

  public constructor(private readonly __httpClient: HttpClient) {
    this.__cache = new AppSetting();
    this.__loaded = false;
  }

  //#endregion

  //#region Application configuration

  /*
   * Load app configuration from json file.
   * */
  public getSettingsAsync(ignoreCache?: boolean): Observable<AppSetting> {
    if (ignoreCache === true && this.__loaded) {
      return of(this.__cache);
    }

    const getAppSettingObservables: Observable<AppSetting>[] = [];
    for (const configurationFile of environment.configurationFiles) {
      const getAppSettingObservable = this.__httpClient
        .get<AppSetting>(configurationFile)
        .pipe(
          catchError((exception) => {
            console.error(exception);
            return of(new AppSetting());
          })
        );

      getAppSettingObservables.push(getAppSettingObservable);
    }

    return forkJoin(getAppSettingObservables).pipe(
      map((appSettings) => {
        let option = new AppSetting();
        for (const appSetting of appSettings) {
          option = lodashMerge(option, appSetting);
        }

        this.__cache = option;
        this.__loaded = true;
        return option;
      })
    );
  }

  //#endregion
}
