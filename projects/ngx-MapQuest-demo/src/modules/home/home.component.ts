import {Component, OnInit} from '@angular/core';
import {MqMarker} from '../../models/mq-marker';
import {MarkerStorageService} from '../../services/implementations/marker-storage.service';
import {cloneDeep} from 'lodash-es';
import {TextMarkerStorageService} from '../../services/implementations/text-marker-storage.service';
import {TextMarker} from '../../models/text-marker';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dashboard',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit {

  //#region Properties

  private readonly _mqMapOptions: L.MapOptions;

  private _markers: MqMarker[];

  private _textMarkers: TextMarker[];

  private _markerIdToAvailability: { [id: string]: boolean };

  //#endregion

  //#region Accessors

  public get mqMapOptions(): L.MapOptions {
    return this._mqMapOptions;
  }

  public get markers(): MqMarker[] {
    return this._markers;
  }

  public get textMarkers(): TextMarker[] {
    return this._textMarkers;
  }

  public get markerIdToAvailability(): { [id: string]: boolean } {
    return this._markerIdToAvailability;
  }

  //#endregion

  //#region Constructor

  public constructor(protected readonly markerStorageService: MarkerStorageService,
                     protected readonly textMarkerStorageService: TextMarkerStorageService) {
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
    const idToAvailability: { [id: string]: boolean } = {};
    for (const marker of markers) {
      idToAvailability[marker.id] = true;
    }
    this._markerIdToAvailability = idToAvailability;
    this._markers = markers;

    this._textMarkers = this.textMarkerStorageService.getTextMarkers();
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
