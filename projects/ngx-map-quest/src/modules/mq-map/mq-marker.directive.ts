import {Directive, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {v4 as uuid} from 'uuid';
import {MqMarkerService} from '../../services/mq-marker.service';
import {Subject, Subscription} from 'rxjs';
import {DragEndEvent, LatLngExpression, LeafletEvent, LeafletMouseEvent, Marker, MarkerOptions} from 'leaflet';
import {MqMapService} from '../../services/mq-map.service';
import {MqMapComponent} from './mq-map.component';
import {filter} from 'rxjs/operators';

declare var L: any;
declare type MARKER_PROPERTY = 'coordinate' | 'options';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'mq-map mq-marker'
})
export class MqMarkerDirective implements OnInit, OnDestroy {

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

  //#region Events

  // tslint:disable-next-line:no-output-rename
  @Output('mq-move')
  public readonly moveEvent: EventEmitter<LeafletEvent> = new EventEmitter<LeafletEvent>();

  // tslint:disable-next-line:no-output-rename
  @Output('mq-drag-start')
  public readonly dragStartEvent: EventEmitter<LeafletEvent> = new EventEmitter<LeafletEvent>();

  // tslint:disable-next-line:no-output-rename
  @Output('mq-move-start')
  public readonly moveStartEvent: EventEmitter<LeafletEvent> = new EventEmitter<LeafletEvent>();

  // tslint:disable-next-line:no-output-rename
  @Output('mq-drag')
  public readonly dragEvent: EventEmitter<LeafletEvent> = new EventEmitter<LeafletEvent>();

  // tslint:disable-next-line:no-output-rename
  @Output('mq-drag-end')
  public readonly dragEndEvent: EventEmitter<LeafletEvent> = new EventEmitter<DragEndEvent>();

  // tslint:disable-next-line:no-output-rename
  @Output('mq-move-end')
  public readonly moveEndEvent: EventEmitter<LeafletEvent> = new EventEmitter<LeafletEvent>();

  // tslint:disable-next-line:no-output-rename
  @Output('mq-click')
  public readonly clickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter<LeafletMouseEvent>();

  // tslint:disable-next-line:no-output-rename
  @Output('mq-double-click')
  public readonly doubleClickEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter<LeafletMouseEvent>();

  // tslint:disable-next-line:no-output-rename
  @Output('mq-mouse-down')
  public readonly mouseDownEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter<LeafletMouseEvent>();

  // tslint:disable-next-line:no-output-rename
  @Output('mq-mouse-up')
  public readonly mouseUpEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter<LeafletMouseEvent>();

  // tslint:disable-next-line:no-output-rename
  @Output('mq-mouse-over')
  public readonly mouseOverEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter<LeafletMouseEvent>();

  // tslint:disable-next-line:no-output-rename
  @Output('mq-mouse-out')
  public readonly mouseOutEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter<LeafletMouseEvent>();

  // tslint:disable-next-line:no-output-rename
  @Output('mq-context-menu')
  public readonly contextMenuEvent: EventEmitter<LeafletMouseEvent> = new EventEmitter<LeafletMouseEvent>();

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
          this._instance = L.marker(this.coordinate, this.options);
        }

        this._instance.addTo(mapControl);
        this.hookMarkerEvent(this._instance);
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

            this._instance = L.marker(this.coordinate, this.options);
            this._instance.addTo(this.mapComponent.instance);
            this.hookMarkerEvent(this._instance);
            this.markerService.addMarker(this.uuid, this._instance);
        }
      });
    this._subscription.add(hookInstanceUpdateSubscription);
  }

  //#endregion

  //#region Internal methods

  protected hookMarkerEvent(instance: Marker): void {

    if (!instance) {
      return;
    }

    instance.on('move', (event: LeafletEvent) => this.moveEvent.emit(event));

    instance.on('dragstart', (event: LeafletEvent) => this.dragStartEvent.emit(event));
    instance.on('movestart', (event: LeafletEvent) => this.moveStartEvent.emit(event));
    instance.on('drag', (event: LeafletEvent) => this.dragEvent.emit(event));
    instance.on('dragend', (event: DragEndEvent) => this.dragEndEvent.emit(event));
    instance.on('moveend', (event: LeafletEvent) => this.moveEndEvent.emit(event));

    instance.on('click', (event: LeafletMouseEvent) => this.clickEvent.emit(event));
    instance.on('dblclick', (event: LeafletMouseEvent) => this.doubleClickEvent.emit(event));
    instance.on('mousedown', (event: LeafletMouseEvent) => this.mouseDownEvent.emit(event));
    instance.on('mouseup', (event: LeafletMouseEvent) => this.mouseUpEvent.emit(event));
    instance.on('mouseover', (event: LeafletMouseEvent) => this.mouseOverEvent.emit(event));
    instance.on('mouseout', (event: LeafletMouseEvent) => this.mouseOutEvent.emit(event));
    instance.on('contextmenu', (event: LeafletMouseEvent) => this.contextMenuEvent.emit(event));
  }

  //#endregion
}
