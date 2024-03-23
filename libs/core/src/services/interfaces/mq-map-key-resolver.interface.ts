import { Observable } from 'rxjs';

export interface IMqMapKeyResolver {
  //#region Methods

  // Get map quest key asynchronously.
  getMapQuestKeyAsync(): Observable<string>;

  //#endregion
}
