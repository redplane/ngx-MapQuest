import {Observable} from 'rxjs';
import {MqPlaceSearchRequest} from '../../models/place-search/mq-place-search-request';
import {MqPlaceSearchResponse} from '../../models/place-search/mq-place-search-response';

export interface IMqPlaceSearchService {

  //#region Methods

  // Get a list of search results ordered by relevance or distance from a spatial reference point,
  // optionally filtered by category,
  // and optionally bounded within a geographic constraint
  doPlaceSearchAsync(model: MqPlaceSearchRequest): Observable<MqPlaceSearchResponse>;

  //#endregion

}
