import {Injectable} from '@angular/core';
import { IMqMapKeyResolver } from 'ngx-MapQuest';
import {Observable, of} from 'rxjs';

@Injectable()
export class MqMapKeyResolver implements IMqMapKeyResolver {

  //#region Methods

  public getMapQuestKeyAsync(): Observable<string> {
    return of('VPXIGB9T8KFd8uj8B0LJRZtXZ8Bh4jPo');
  }

  //#endregion
}
