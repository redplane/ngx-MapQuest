import {Directive, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {v4 as uuid} from 'uuid';
import {Subject, Subscription} from 'rxjs';
import {DivIcon, DragEndEvent, Icon, LatLngExpression, LeafletEvent, LeafletMouseEvent, Marker, MarkerOptions} from 'leaflet';
import {MqMapService} from '../../services/mq-map.service';
import {MqMapComponent} from './mq-map.component';
import {filter, map} from 'rxjs/operators';

declare var L: any;
declare type MARKER_PROPERTY = 'coordinate' | 'icon' | 'opacity' | 'options' | 'zIndexOffset';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'mq-map mq-marker'
})
export class MqMarkerDirective implements OnInit, OnDestroy {

  //#region Accessors

  // Unique id of component.
  public get uuid(): string {
    return this._uuid;
  }

  // For updating marker coordinate.
  @Input()
  public set coordinate(value: LatLngExpression) {
    this._coordinate = {...value};
    this._updateMarkerSubject.next('coordinate');
  }

  // For updating marker options.
  @Input()
  public set options(value: MarkerOptions) {
    this._options = {...value};
    this._icon = value?.icon;
    this._opacity = value?.opacity;
    this._zIndexOffset = value?.zIndexOffset;

    this._changingOptions = true;
    this._updateMarkerSubject.next('options');
  }

  // For updating opacity.
  @Input()
  public set opacity(value: number) {
    this._opacity = value;
    this._updateMarkerSubject.next('opacity');
  }

  // For updating icon.
  @Input()
  public set icon(value: Icon | DivIcon) {
    this._icon = value;
    this._updateMarkerSubject.next('icon');
  }

  @Input()
  public set zIndexOffset(value: number) {
    this._zIndexOffset = value;
    this._updateMarkerSubject.next('zIndexOffset');
  }

  //#endregion

  //#region Constructor

  public constructor(protected readonly mqMapService: MqMapService,
                     protected readonly mapComponent: MqMapComponent) {
    this._uuid = uuid();

    this._updateMarkerSubject = new Subject<MARKER_PROPERTY>();
    this._subscription = new Subscription();
  }

  //#region Properties

  // Id of mq marker.
  private readonly _uuid: string;

  // Whether option is being changed.
  // This will prevent another property from being update.
  private _changingOptions: boolean;

  // Marker instance.
  private _instance: L.Marker;

  // Coordinate of marker.
  private _coordinate: LatLngExpression;

  // Option of marker.
  private _options: L.MarkerOptions;

  // Opacity
  private _opacity: number;

  // Icon
  private _icon: Icon | DivIcon;

  // Z-index offset
  private _zIndexOffset: number;

  // Subscription watch list.
  private _subscription: Subscription;

  // Raise event to update marker instance.
  private _updateMarkerSubject: Subject<MARKER_PROPERTY>;

  //#endregion

  //#region Events

  // tslint:disable-next-line:no-output-rename
  @Output('mq-ready')
  public readonly readyEvent: EventEmitter<void> = new EventEmitter<void>();

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

  public instance(): L.Marker {
    return this._instance;
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
          this._instance = L.marker(this._coordinate, this._options);
        }

        this._instance.addTo(mapControl);
        this.hookMarkerEvent(this._instance);

        // Hook instance updated event.
        this.hookInstanceUpdateEvent();

        // Mark the marker as ready.
        this.readyEvent.emit();
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

    const hookInstanceUpdateSubscription = this._updateMarkerSubject
      .pipe(
        map(changedProperty => this._changingOptions ? 'options' : changedProperty)
      )
      .subscribe(changedProperty => {
        switch (changedProperty) {

          case 'coordinate':
            this._instance.setLatLng(this._coordinate);
            break;

          case 'icon':
            this._instance?.setIcon(this._icon);
            break;

          case 'opacity':
            this._instance?.setOpacity(this._opacity);
            break;

          case 'zIndexOffset':
            this._instance?.setZIndexOffset(this._zIndexOffset);
            break;

          case 'options':
            // Remove the previous instance.
            if (this._instance && this.mapComponent.instance) {
              this._instance.removeFrom(this.mapComponent.instance);
            }

            this._instance = L.marker(this.coordinate, this.options);
            this._instance.addTo(this.mapComponent.instance);
            this.hookMarkerEvent(this._instance);
            this._changingOptions = false;
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
