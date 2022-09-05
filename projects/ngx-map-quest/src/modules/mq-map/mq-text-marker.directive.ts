import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {v4 as uuid} from 'uuid';
import {MqMarkerService} from '../../services/mq-marker.service';
import {Subject, Subscription} from 'rxjs';
import {LatLngExpression, MarkerOptions} from 'leaflet';
import {MqMapService} from '../../services/mq-map.service';
import {MqMapComponent} from './mq-map.component';
import {filter} from 'rxjs/operators';

declare var L: any;
declare type MARKER_PROPERTY = 'coordinate' | 'options';

@Directive({
  selector: 'mq-map mq-text-marker'
})
export class MqTextMarkerDirective implements OnInit, OnDestroy {

  //#region Properties

  // Id of mq marker.
  private readonly _uuid: string;

  // Marker instance.
  private _instance: L.Marker;

  // Coordinate of marker.
  private _coordinate: LatLngExpression;

  // Option of marker.
  private _options: L.MarkerOptions;

  // Subscription watch list.
  private _subscription: Subscription;

  // Raise event to update marker instance.
  private _updateInstanceSubject: Subject<{ property: MARKER_PROPERTY, value: any }>;

  //#endregion

  //#region Accessors

  public get uuid(): string {
    return this._uuid;
  }

  @Input()
  public set coordinate(value: LatLngExpression) {
    this._coordinate = {...value};
  }

  public get coordinate(): LatLngExpression {
    return this._coordinate;
  }

  @Input()
  public set options(value: MarkerOptions) {
    this._options = {...value};
  }

  public get options(): MarkerOptions {
    return this._options;
  }

  //#endregion

  //#region Constructor

  public constructor(protected readonly markerService: MqMarkerService,
                     protected readonly mqMapService: MqMapService,
                     protected readonly mapComponent: MqMapComponent) {
    this._uuid = uuid();

    this._updateInstanceSubject = new Subject<{ property: MARKER_PROPERTY, value: any }>();
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Life cycle

  public ngOnInit(): void {

    const hookMapLoadedSubscription = this.mqMapService
      .mapLoadedEvent
      .pipe(
        filter(mapControl => mapControl === this.mapComponent.instance)
      )
      .subscribe(mapControl => {
        if (!this._instance) {
          this._instance = L.mapquest.textMarker(this.coordinate, this.options);
        }

        this._instance.addTo(mapControl);
        this.markerService.addMarker(this.uuid, this._instance);

        // Hook instance updated event.
        this.hookInstanceUpdateEvent();
      });
    this._subscription.add(hookMapLoadedSubscription);
  }

  public ngOnDestroy(): void {

    // Remove the marker from map when the component is destroyed.
    if (this._instance && this.mapComponent.instance) {
      this._instance.removeFrom(this.mapComponent.instance);
    }

    this._subscription?.unsubscribe();
  }

  //#endregion

  //#region Methods

  protected hookInstanceUpdateEvent(): void {

    const hookInstanceUpdateSubscription = this._updateInstanceSubject
      .subscribe(({property, value}) => {
        switch (property) {
          case 'coordinate':
            this._instance.setLatLng(value);
            break;

          case 'options':
            // Remove the previous instance.
            if (this._instance && this.mapComponent.instance) {
              this._instance.removeFrom(this.mapComponent.instance);
              this.markerService.deleteMarker(this.uuid);
            }

            this._instance = L.mapquest.textMarker(this.coordinate, this.options);
            this._instance.addTo(this.mapComponent.instance);
            this.markerService.addMarker(this.uuid, this._instance);
        }
      });
    this._subscription.add(hookInstanceUpdateSubscription);
  }

  //#endregion
}
