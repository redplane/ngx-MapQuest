import {Injectable} from '@angular/core';
import { IMqMapKeyResolver } from 'ngx-MapQuest';
import {Observable, of} from 'rxjs';

@Injectable()
export class MqMapKeyResolver implements IMqMapKeyResolver {

  //#region Methods

  public getMapQuestKeyAsync(): Observable<string> {
    return of('lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24');
  }

  //#endregion
}
