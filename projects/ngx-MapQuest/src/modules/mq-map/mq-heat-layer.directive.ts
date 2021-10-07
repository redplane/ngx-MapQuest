import {Directive, Inject, Input, OnDestroy, OnInit, Optional} from '@angular/core';
import {v4 as uuid} from 'uuid';
import {Subject, Subscription} from 'rxjs';
import {LatLng} from 'leaflet';
import {MqMapService} from '../../services/mq-map.service';
import {MqMapComponent} from './mq-map.component';
import {filter, map, switchMap} from 'rxjs/operators';
import {MqFileLoaderService} from '../../services/mq-file-loader.service';
import {HeatLayerOptions} from '../../models/heat-layer-options';
import {MQ_HEAT_LAYER_REQUIRED_FILES_PROVIDER} from '../../constants/injectors';
import {MqSystemFile} from '../../models/system-files/mq-system-file';
import {MqScriptFile} from '../../models/system-files/mq-script-file';

declare var L: any;
declare type HEAT_LAYER_PROPERTY = 'options' | 'coordinates';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'mq-map mq-heat-layer'
})
export class MqHeatLayerDirective implements OnInit, OnDestroy {

  //#region Accessors

  public get uuid(): string {
    return this._uuid;
  }

  @Input()
  public set coordinates(value: LatLng[]) {
    this._coordinates = value;
  }

  public get coordinates(): LatLng[] {
    return this._coordinates;
  }

  @Input()
  public set options(value: HeatLayerOptions) {
    this._options = {...value};
  }

  public get options(): HeatLayerOptions {
    return this._options;
  }

  //#endregion

  //#region Constructor

  public constructor(protected readonly mqMapService: MqMapService,
                     protected readonly mapComponent: MqMapComponent,
                     @Inject(MQ_HEAT_LAYER_REQUIRED_FILES_PROVIDER) @Optional() protected readonly mqMapHeatFiles: MqSystemFile[],
                     protected readonly mqFileLoaderService: MqFileLoaderService) {
    this._uuid = uuid();

    this._updateInstanceSubject = new Subject<{ property: HEAT_LAYER_PROPERTY, value: any }>();
    this._subscription = new Subscription();
  }

  //#region Properties

  // Id of mq marker.
  private readonly _uuid: string;

  // Marker instance.
  private _instance: any;

  // Coordinate of marker.
  private _coordinates: LatLng[];

  // Option of marker.
  private _options: HeatLayerOptions;

  // Subscription watch list.
  private _subscription: Subscription;

  // Raise event to update marker instance.
  private _updateInstanceSubject: Subject<{ property: HEAT_LAYER_PROPERTY, value: any }>;

  //#endregion

  //#region Life cycle

  public ngOnInit(): void {

    const hookMapLoadedSubscription = this.mqMapService
      .mapLoadedEvent
      .pipe(
        filter(mapControl => mapControl === this.mapComponent.instance),
        switchMap(mapControl => {
          let requiredFiles: MqSystemFile[] = this.mqMapHeatFiles;
          if (!requiredFiles || !requiredFiles.length) {
            requiredFiles = [new MqScriptFile('https://leaflet.github.io/Leaflet.heat/dist/leaflet-heat.js')];
          }

          return this.mqFileLoaderService.loadSystemFilesAsync(requiredFiles)
            .pipe(
              map(() => mapControl)
            );
        })
      )
      .subscribe(mapControl => {
        if (!this._instance) {
          this._instance = L.heatLayer(this.coordinates, this.options);
        }

        this._instance.addTo(mapControl);

        // Hook instance updated event.
        this.hookInstanceUpdateEvent();
      });
    this._subscription.add(hookMapLoadedSubscription);
  }

  public ngOnDestroy(): void {

    this._subscription?.unsubscribe();

    // Remove the marker from map when the component is destroyed.
    if (this._instance && this.mapComponent.instance) {
      this._instance.removeFrom(this.mapComponent.instance);
    }
  }

  //#endregion

  //#region Methods

  protected hookInstanceUpdateEvent(): void {

    const hookInstanceUpdateSubscription = this._updateInstanceSubject
      .subscribe(({property, value}) => {
        switch (property) {
          case 'coordinates':
            this._instance.setLatLngs(value);
            break;

          case 'options':
            // Remove the previous instance.
            if (this._instance) {
              this._instance.setOptions(this._options);
            }
        }
      });
    this._subscription.add(hookInstanceUpdateSubscription);
  }

  //#endregion

  //#region Internal methods


  //#endregion
}
