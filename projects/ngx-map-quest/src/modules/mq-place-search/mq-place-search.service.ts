import {IMqPlaceSearchService} from './mq-place-search-service.interface';
import {Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {MqPlaceSearchRequest} from '../../models/place-search/mq-place-search-request';
import {MqPlaceSearchResponse} from '../../models/place-search/mq-place-search-response';
import {IMqMapKeyResolver} from '../../services/interfaces/mq-map-key-resolver.interface';
import {MAP_QUEST_KEY_RESOLVER_PROVIDER} from '../../constants/injectors';
import {mergeMap} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';

export class MqPlaceSearchService implements IMqPlaceSearchService {

  //#region Properties

  private readonly _mqMapKeyResolver: IMqMapKeyResolver;

  private readonly _httpClient: HttpClient;

  //#endregion

  //#region Constructor

  public constructor(injector: Injector) {
    this._mqMapKeyResolver = injector.get(MAP_QUEST_KEY_RESOLVER_PROVIDER);
    this._httpClient = injector.get(HttpClient);
  }

  //#endregion

  //#region Methods

  public doPlaceSearchAsync(model: MqPlaceSearchRequest): Observable<MqPlaceSearchResponse> {
    return this._mqMapKeyResolver.getMapQuestKeyAsync()
      .pipe(
        mergeMap((apiKey: string) => {
          const apiUrl = `https://www.mapquestapi.com/search/v4/place`;
          let httpParams = new HttpParams()
            .append('key', apiKey);

          if (model.location && model.location.length === 2) {
            httpParams = httpParams.append(`location`,
              `${model.location[0]},${model.location[1]}`);
          }

          if (model.category && model.category.length > 0) {
            httpParams = httpParams.append('category', `${model.category.join(',')}`);
          }

          httpParams = httpParams.append('sort', model.sort);
          httpParams = httpParams.append('feedback', `${!!model.feedback}`);

          if (model.circle && model.circle.length === 3) {
            httpParams = httpParams.append('circle', `${model.circle.join(',')}`);
          }

          if (model.bbox && model.bbox.length === 4) {
            httpParams = httpParams.append('bbox', `${model.bbox.join(',')}`);
          }

          httpParams = httpParams.append('pageSize', `${model.pageSize}`)
            .append('page', `${model.page}`);

          if (model.q && model.q.length) {
            httpParams = httpParams.append('q', `${model.q}`);
          }

          return this._httpClient.get<MqPlaceSearchResponse>(apiUrl, {
            params: httpParams
          });
        })
      );
  }

  //#endregion
}
