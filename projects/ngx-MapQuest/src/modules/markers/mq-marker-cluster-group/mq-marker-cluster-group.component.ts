import {ChangeDetectionStrategy, Component, Inject, Input, OnDestroy, OnInit, Optional} from '@angular/core';
import {MqMapService} from '../../../services/mq-map.service';
import {filter} from 'rxjs/operators';
import {Observable, Subject, Subscription} from 'rxjs';
import {MqMapComponent} from '../../mq-map/mq-map.component';
import {MarkerClusterGroupOptions} from '../../../models/marker-cluster-group-options';
import {MqCssFile, MqScriptFile, MqSystemFile} from '../../../models';
import {MQ_MARKER_CLUSTER_GROUP_REQUIRED_FILES_PROVIDER} from '../../../constants';
import {MqFileLoaderService} from '../../../services/mq-file-loader.service';

declare var L: any;

@Component({
  selector: 'mq-map mq-marker-cluster-group',
  template: `
    <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MqMarkerClusterGroupComponent implements OnInit, OnDestroy {

  //#region Properties

  // Option of marker cluster group.
  private _options: MarkerClusterGroupOptions;

  // Instance of marker cluster group.
  private _instance: L.FeatureGroup;

  // Subject about building marker cluster group.
  private _buildMarkerClusterGroupSubject: Subject<void>;

  // Marker cluster group subscription.
  private _buildMarkerClusterGroupSubscription: Subscription;

  // Subscription watch list.
  private _subscription: Subscription;

  //#endregion

  //#region Accessors

  @Input()
  public set options(value: MarkerClusterGroupOptions) {
    this._options = {...value};
  }

  //#endregion

  //#region Constructor

  public constructor(
    @Optional() @Inject(MQ_MARKER_CLUSTER_GROUP_REQUIRED_FILES_PROVIDER)
    protected readonly mqMarkerClusterGroupRequiredFiles: MqSystemFile[],
    protected readonly mqFileLoaderService: MqFileLoaderService,
    protected readonly mqMapService: MqMapService,
    protected readonly mapComponent: MqMapComponent) {
    this._buildMarkerClusterGroupSubject = new Subject();
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Life cycle hooks

  public ngOnInit(): void {

    // Register to map ready event.
    const hookMapReadyEventSubscription = this.mqMapService
      .mapLoadedEvent
      .pipe(
        filter(mapControl => mapControl === this.mapComponent.instance)
      )
      .subscribe(() => {
        this.buildMarkerClusterGroupSubject();
      });
    this._subscription.add(hookMapReadyEventSubscription);

  }

  public ngOnDestroy(): void {
    this.destroyMarkerClusterGroup();
  }

  //#endregion

  //#region Methods

  //#endregion

  //#region Internal methods

  protected buildMarkerClusterGroupSubject(): void {

    this._buildMarkerClusterGroupSubscription?.unsubscribe();
    this._buildMarkerClusterGroupSubscription = this._buildMarkerClusterGroupSubject
      .pipe(

      )
      .subscribe(() => {
        this.buildMarkerClusterGroup();
      });
  }

  // Add a marker group.
  protected buildMarkerClusterGroup(): void {

    // Invalid map component.
    if (!this?.mapComponent?.instance) {
      return;
    }

    this.destroyMarkerClusterGroup();
    this._instance = L.markerClusterGroup(this._options);
    this.mapComponent.instance.addLayer(this._instance);
  }

  // Destroy marker cluster group.
  protected destroyMarkerClusterGroup(): void {

    if (!this.mapComponent) {
      return;
    }

    if (!this.mapComponent.instance) {
      return;
    }

    if (!this._instance) {
      return;
    }

    this.mapComponent.instance.removeLayer(this._instance);
    this._instance = null;
  }

  // For loading the required files asynchronously.
  protected loadSystemFilesAsync(): Observable<void> {

    let mqSystemFiles = this.mqMarkerClusterGroupRequiredFiles;
    if (!mqSystemFiles || !mqSystemFiles.length) {
      mqSystemFiles = [
        new MqScriptFile('https://unpkg.com/leaflet.markercluster@1.0.6/dist/leaflet.markercluster.js'),
        new MqCssFile('https://unpkg.com/leaflet.markercluster@1.0.6/dist/MarkerCluster.css'),
        new MqCssFile('https://unpkg.com/leaflet.markercluster@1.0.6/dist/MarkerCluster.Default.css')
      ];
    }

    return this.mqFileLoaderService.loadSystemFilesAsync(mqSystemFiles);
  }

  //#endregion
}
