import { MqFeedBack } from './mq-feed-back';
import { MqPagination } from './mq-pagination';
import { MqPlaceSearchRequest } from './mq-place-search-request';
import { MqPlaceSearchResult } from './mq-place-search-result';

export class MqPlaceSearchResponse {
  //#region Properties

  // An object containing links that relay consumer behavior back to the API.
  public feedback?: MqFeedBack;

  // An object that aids in navigation between adjacent pages.
  public pagination: MqPagination;

  // An object that contains the input values for the request. Intended to aid in development, by acknowledging and echoing back request parameters; values and structure are subject to change,
  // and thus should not be relied upon programmatically.
  public request: MqPlaceSearchRequest;

  // An object containing a list of matching items.
  public results: MqPlaceSearchResult[];

  //#endregion
}
