import {IMqMapKeyResolver} from 'ngx-map-quest';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable()
export class MqMapKeyResolver implements IMqMapKeyResolver {

  //#region Methods

  public getMapQuestKeyAsync(): Observable<string> {
    return of('lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24');
  }

  //#endregion
}
