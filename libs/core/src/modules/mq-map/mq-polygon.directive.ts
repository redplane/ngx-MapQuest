import {
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  LatLngExpression,
  LeafletEvent,
  LeafletMouseEvent,
  PolylineOptions,
} from 'leaflet';
import { Subject, Subscription } from 'rxjs';
import { MqMapService } from '../../services/mq-map.service';
import { MqMapComponent } from './mq-map.component';
import { filter } from 'rxjs/operators';
import { cloneDeep } from 'lodash-es';
import { v4 as uuid } from 'uuid';
import { MqPolygonService } from '../../services/mq-polygon.service';

declare var L: any;
declare type POLYGON_PROPERTY = 'point' | 'options';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'mq-map mq-polygon',
})
export class MqPolygonDirective implements OnInit, OnDestroy {
  //#region Properties

  // Points in the polygon.
  private _points:
    | LatLngExpression[]
    | LatLngExpression[][]
    | LatLngExpression[][][];

  // Option in the polyline.
  public _options: PolylineOptions;

  // Id of mq marker.
  private readonly _uuid: string;

  // Circle instance.
  private _instance: L.Polygon;

  // Subscription watch list.
  private _subscription: Subscription;

  // Raise event to update marker instance.
  private _updateInstanceSubject: Subject<{
    property: POLYGON_PROPERTY;
    value: any;
  }>;

  //#endregion

  //#region Accessors

  public get uuid(): string {
    return this._uuid;
  }

  // Points in the polygon
  @Input()
  public set points(
    value: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][]
  ) {
    this._points = cloneDeep(value);
  }

  public get points():
    | LatLngExpression[]
    | LatLngExpression[][]
    | LatLngExpression[][][] {
    return this._points;
  }

  @Input()
  public set options(value: PolylineOptions) {
    this._options = { ...value };
  }

  public get options(): PolylineOptions {
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
    protected readonly polygonService: MqPolygonService,
    protected readonly mqMapService: MqMapService,
    protected readonly mapComponent: MqMapComponent
  ) {
    this._uuid = uuid();

    this._updateInstanceSubject = new Subject<{
      property: POLYGON_PROPERTY;
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
          this._instance = L.polygon(this.points, this.options);
        }

        this._instance.addTo(mapControl);
        this.hookPolygonEvents(this._instance);
        this.polygonService.addItem(this.uuid, this._instance);

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
          case 'point':
            this._instance.setLatLngs(value);
            this._instance.redraw();
            break;

          case 'options':
            // Remove the previous instance.
            if (this._instance && this.mapComponent.instance) {
              this._instance.removeFrom(this.mapComponent.instance);
              this.polygonService.deleteItem(this.uuid);
            }

            this._instance = L.polygon(this.points, this.options);
            this._instance.addTo(this.mapComponent.instance);
            this.hookPolygonEvents(this._instance);
            this.polygonService.addItem(this.uuid, this._instance);
        }
      });
    this._subscription.add(hookInstanceUpdateSubscription);
  }

  //#endregion

  //#region Internal methods

  protected hookPolygonEvents(instance: L.Polygon): void {
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
