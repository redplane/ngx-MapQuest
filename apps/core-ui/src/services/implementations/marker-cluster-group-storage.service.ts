import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MarkerClusterGroupStorageService {
  //#region Constructor

  public constructor(protected readonly httpClient: HttpClient) {}

  //#endregion

  //#region Methods

  public loadMarkerClusterGroupCoordinatesAsync(): Observable<any[][]> {
    return this.httpClient.get<string[][]>(
      '/assets/databases/marker-cluster-group-coordinates.json'
    );
  }

  //#endregion
}
