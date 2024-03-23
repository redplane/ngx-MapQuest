import {
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  CircleMarker,
  CircleMarkerOptions,
  LatLngExpression,
  LeafletEvent,
  LeafletMouseEvent,
} from 'leaflet';
import { Subject, Subscription } from 'rxjs';
import { MqMapService } from '../../services/mq-map.service';
import { MqMapComponent } from './mq-map.component';
import { v4 as uuid } from 'uuid';
import { filter } from 'rxjs/operators';
import { MqCircleService } from '../../services/mq-circle.service';

declare var L: any;
declare type CIRCLE_PROPERTY = 'options' | 'coordinate';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'mq-map mq-circle',
})
export class MqCircleDirective implements OnInit, OnDestroy {
  //#region Properties

  // Id of mq marker.
  private readonly _uuid: string;

  // Circle instance.
  private _instance: L.CircleMarker;

  // Coordinate of circle.
  private _coordinate: LatLngExpression;

  // Option of circle.
  private _options: L.CircleMarkerOptions;

  // Subscription watch list.
  private _subscription: Subscription;

  // Raise event to update marker instance.
  private _updateInstanceSubject: Subject<{
    property: CIRCLE_PROPERTY;
    value: any;
  }>;

  //#endregion

  //#region Accessors

  public get uuid(): string {
    return this._uuid;
  }

  @Input()
  public set coordinate(value: LatLngExpression) {
    this._coordinate = { ...value };
  }

  public get coordinate(): LatLngExpression {
    return this._coordinate;
  }

  @Input()
  public set options(value: CircleMarkerOptions) {
    this._options = { ...value };
  }

  public get options(): CircleMarkerOptions {
    return this._options;
  }

  //#endregion

  //#region Events

  // tslint:disable-next-line:no-output-rename
  @Output('mq-move')
  public readonly moveEvent: EventEmitter<LeafletEvent> =
    new EventEmitter<LeafletEvent>();

  // tslint:disable-next-line:no-output-rename
  @Output('mq-click')
  public readonly clickEvent: EventEmitter<LeafletMouseEvent> =
    new EventEmitter<LeafletMouseEvent>();

  // tslint:disable-next-line:no-output-rename
  @Output('mq-double-click')
  public readonly doubleClickEvent: EventEmitter<LeafletMouseEvent> =
    new EventEmitter<LeafletMouseEvent>();

  // tslint:disable-next-line:no-output-rename
  @Output('mq-mouse-down')
  public readonly mouseDownEvent: EventEmitter<LeafletMouseEvent> =
    new EventEmitter<LeafletMouseEvent>();

  // tslint:disable-next-line:no-output-rename
  @Output('mq-mouse-up')
  public readonly mouseUpEvent: EventEmitter<LeafletMouseEvent> =
    new EventEmitter<LeafletMouseEvent>();

  // tslint:disable-next-line:no-output-rename
  @Output('mq-mouse-over')
  public readonly mouseOverEvent: EventEmitter<LeafletMouseEvent> =
    new EventEmitter<LeafletMouseEvent>();

  // tslint:disable-next-line:no-output-rename
  @Output('mq-mouse-out')
  public readonly mouseOutEvent: EventEmitter<LeafletMouseEvent> =
    new EventEmitter<LeafletMouseEvent>();

  // tslint:disable-next-line:no-output-rename
  @Output('mq-context-menu')
  public readonly contextMenuEvent: EventEmitter<LeafletMouseEvent> =
    new EventEmitter<LeafletMouseEvent>();

  //#endregion

  //#region Constructor

  public constructor(
    protected readonly circleService: MqCircleService,
    protected readonly mqMapService: MqMapService,
    protected readonly mapComponent: MqMapComponent
  ) {
    this._uuid = uuid();

    this._updateInstanceSubject = new Subject<{
      property: CIRCLE_PROPERTY;
      value: any;
    }>();
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Life cycle

  public ngOnInit(): void {
    const hookMapLoadedSubscription = this.mqMapService.mapLoadedEvent
      .pipe(filter((mapControl) => mapControl === this.mapComponent.instance))
      .subscribe((mapControl) => {
        if (!this._instance) {
          this._instance = L.circle(this.coordinate, this.options);
        }

        this._instance.addTo(mapControl);
        this.hookCircleMarkerEvent(this._instance);
        this.circleService.addMarker(this.uuid, this._instance);

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
    const hookInstanceUpdateSubscription =
      this._updateInstanceSubject.subscribe(({ property, value }) => {
        switch (property) {
          case 'coordinate':
            this._instance.setLatLng(value);
            break;

          case 'options':
            // Remove the previous instance.
            if (this._instance && this.mapComponent.instance) {
              this._instance.removeFrom(this.mapComponent.instance);
              this.circleService.deleteMarker(this.uuid);
            }

            this._instance = L.marker(this.coordinate, this.options);
            this._instance.addTo(this.mapComponent.instance);
            this.hookCircleMarkerEvent(this._instance);
            this.circleService.addMarker(this.uuid, this._instance);
        }
      });
    this._subscription.add(hookInstanceUpdateSubscription);
  }

  //#endregion

  //#region Internal methods

  protected hookCircleMarkerEvent(instance: CircleMarker): void {
    if (!instance) {
      return;
    }

    instance.on('move', (event: LeafletEvent) => this.moveEvent.emit(event));

    instance.on('click', (event: LeafletMouseEvent) =>
      this.clickEvent.emit(event)
    );
    instance.on('dblclick', (event: LeafletMouseEvent) =>
      this.doubleClickEvent.emit(event)
    );
    instance.on('mousedown', (event: LeafletMouseEvent) =>
      this.mouseDownEvent.emit(event)
    );
    instance.on('mouseup', (event: LeafletMouseEvent) =>
      this.mouseUpEvent.emit(event)
    );
    instance.on('mouseover', (event: LeafletMouseEvent) =>
      this.mouseOverEvent.emit(event)
    );
    instance.on('mouseout', (event: LeafletMouseEvent) =>
      this.mouseOutEvent.emit(event)
    );
    instance.on('contextmenu', (event: LeafletMouseEvent) =>
      this.contextMenuEvent.emit(event)
    );
  }

  //#endregion
}
