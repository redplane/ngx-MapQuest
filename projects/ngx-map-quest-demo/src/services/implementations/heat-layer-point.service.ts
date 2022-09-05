import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HeatLayerPointService {

  //#region Constructor

  constructor(protected readonly httpClient: HttpClient) {
  }

  //#endregion

  //#region Methods

  public loadHeatLayerPointsAsync(): Observable<any[]> {
    return this.httpClient.get<any[]>('/assets/databases/heat-layer-points.json');
  }

  //#endregion

}
