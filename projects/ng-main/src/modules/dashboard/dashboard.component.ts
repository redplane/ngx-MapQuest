import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MqMarker} from '../../models/mq-marker';
import {MarkerStorageService} from '../../services/implementations/marker-storage.service';
import {Marker} from 'leaflet';
import {cloneDeep} from 'lodash-es';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  //#region Properties

  private readonly _mqMapOptions: L.MapOptions;

  private _markers: MqMarker[];

  private _markerIdToAvailability: {[id: string]: boolean};

  //#endregion

  //#region Accessors

  public get mqMapOptions(): L.MapOptions {
    return this._mqMapOptions;
  }

  public get markers(): MqMarker[] {
    return this._markers;
  }

  public get markerIdToAvailability(): {[id: string]: boolean} {
    return this._markerIdToAvailability;
  }

  //#endregion

  //#region Constructor

  public constructor(protected readonly markerStorageService: MarkerStorageService) {
    this._mqMapOptions = {};
    this._mqMapOptions.center = {
      lat: 20.9894862,
      lng: 105.8064937
    };

    this._markerIdToAvailability = {};
  }


  //#endregion

  //#region Methods

  public ngOnInit(): void {

    const markers = this.markerStorageService.loadMarkers();
    const idToAvailability: {[id: string]: boolean} = {};
    for (const marker of markers) {
      idToAvailability[marker.id] = true;
    }
    this._markerIdToAvailability = idToAvailability;
    this._markers = markers;
  }

  //#endregion

  //#region Methods

  public deleteMarker(marker: MqMarker): void {
    const clonedMarkerIdToAvailability = cloneDeep(this._markerIdToAvailability);
    clonedMarkerIdToAvailability[marker.id] = false;
    this._markerIdToAvailability = clonedMarkerIdToAvailability;
  }

  public restoreMarker(marker: MqMarker): void {
    const clonedMarkerIdToAvailability = cloneDeep(this._markerIdToAvailability);
    clonedMarkerIdToAvailability[marker.id] = true;
    this._markerIdToAvailability = clonedMarkerIdToAvailability;
  }

  public log(message: string): void {
    console.log(message);
  }

  //#endregion
}
