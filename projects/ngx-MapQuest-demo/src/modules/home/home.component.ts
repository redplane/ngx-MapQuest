import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MqMarker} from '../../models/mq-marker';
import {MarkerStorageService} from '../../services/implementations/marker-storage.service';
import {cloneDeep} from 'lodash-es';
import {TextMarkerStorageService} from '../../services/implementations/text-marker-storage.service';
import {TextMarker} from '../../models/text-marker';
import {HeatLayerPointService} from '../../services/implementations/heat-layer-point.service';
import {Subscription} from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dashboard',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit, OnDestroy {

  //#region Properties

  private readonly _mqMapOptions: L.MapOptions;

  private _markers: MqMarker[];

  private _textMarkers: TextMarker[];

  private _heatLayerPoints: any[];

  private _markerIdToAvailability: { [id: string]: boolean };

  private readonly _subscription: Subscription;

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

  public get heatLayerPoints(): any[] {
    return this._heatLayerPoints;
  }

  //#endregion

  //#region Constructor

  public constructor(protected readonly markerStorageService: MarkerStorageService,
                     protected readonly textMarkerStorageService: TextMarkerStorageService,
                     protected readonly heatLayerPointService: HeatLayerPointService,
                     protected readonly changeDetectorRef: ChangeDetectorRef) {
    this._mqMapOptions = {};
    this._mqMapOptions.center = {
      lat: 20.9894862,
      lng: 105.8064937
    };

    this._markerIdToAvailability = {};
    this._subscription = new Subscription();
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
    this.changeDetectorRef.markForCheck();

    const loadHeatLayerPointsSubscription = this.heatLayerPointService
      .loadHeatLayerPointsAsync()
      .subscribe(heatLayerPoints => {
        this._heatLayerPoints = heatLayerPoints.map((addressPoint) => {
          return [addressPoint[0], addressPoint[1]];
        });
        this.changeDetectorRef.markForCheck();
      });
    this._subscription.add(loadHeatLayerPointsSubscription);
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
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
