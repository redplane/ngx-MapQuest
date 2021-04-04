import {
  AfterContentInit,
  AfterViewInit, Component, ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  QueryList
} from '@angular/core';
import {MAP_QUEST_KEY_RESOLVER_PROVIDER} from '../../constants/injectors';
import {IMqMapKeyResolver} from '../../services/interfaces/mq-map-key-resolver.interface';
import {Observable, of, Subject, Subscription} from 'rxjs';
import {LayerEvent, LayersControlEvent, MapOptions, ResizeEvent} from 'leaflet';
import {cloneDeep} from 'lodash-es';
import {switchMap, tap} from 'rxjs/operators';
import {MqMarkerDirective} from './mq-marker.directive';
import {MqCircleDirective} from './mq-circle.directive';
import {MqPolygonDirective} from './mq-polygon.directive';

declare var L: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mq-map',
  template: `
    <ng-content></ng-content>`
})
export class MqMapComponent implements OnInit, AfterViewInit, AfterContentInit {

  //#region Properties

  // Map control.
  private _mapControl: L.Map;

  // Markers which have been added into map.
  private readonly _addedMarkers: L.Marker[];

  // Circles which have been added into map.
  private readonly _addedCircles: L.Circle[];

  // Polygons which have been added into map.
  protected readonly _addedPolygons: L.Polygon[];

  // Key which used for initializing map control.
  protected _key: string;

  // Map options.
  protected _options: MapOptions;

  // Subject to initialize map control.
  protected _buildMapSubject: Subject<void>;

  // Subscription watch list.
  protected subscription: Subscription;

  @ContentChildren(MqMarkerDirective, {emitDistinctChangesOnly: true, descendants: false})
  public markers: QueryList<MqMarkerDirective>;

  @ContentChildren(MqCircleDirective, {emitDistinctChangesOnly: true, descendants: false})
  public circles: QueryList<MqCircleDirective>;

  @ContentChildren(MqPolygonDirective, {emitDistinctChangesOnly: true, descendants: false})
  public polygons: QueryList<MqPolygonDirective>;

  //#endregion

  //#region Accessors

  @Input()
  public set options(value: MapOptions) {
    this._options = cloneDeep(value);
  }

  //#endregion

  //#region Events

  @Output()
  public readonly baseLayerChange: EventEmitter<LayersControlEvent>;

  @Output()
  public readonly overlayAdd: EventEmitter<LayersControlEvent>;

  @Output()
  public readonly overlayRemove: EventEmitter<LayersControlEvent>;

  @Output()
  public readonly layerAdd: EventEmitter<LayerEvent>;

  @Output()
  public readonly layerRemove: EventEmitter<LayerEvent>;

  @Output()
  public readonly zoomLevelsChange: EventEmitter<Event>;

  @Output()
  public readonly resize: EventEmitter<ResizeEvent>;

  @Output()
  public readonly unload: EventEmitter<Event>;

  @Output()
  public readonly viewReset: EventEmitter<Event>;

  @Output()
  public readonly load: EventEmitter<Event>;

  @Output()
  public readonly zoomStart: EventEmitter<Event>;

  @Output()
  public readonly moveStart: EventEmitter<Event>;

  @Output()
  public readonly zoom: EventEmitter<Event>;

  @Output()
  public readonly move: EventEmitter<Event>;

  @Output()
  public readonly zoomEnd: EventEmitter<Event>;

  @Output()
  public readonly moveEnd: EventEmitter<Event>;

  //#endregion

  //#region Constructor

  public constructor(protected elementRef: ElementRef,
                     @Inject(MAP_QUEST_KEY_RESOLVER_PROVIDER) protected mapKeyResolver: IMqMapKeyResolver) {

    this._mapControl = null;
    this._addedMarkers = [];
    this._addedCircles = [];
    this._addedPolygons = [];

    this._buildMapSubject = new Subject<void>();

    // Event registration.
    this.baseLayerChange = new EventEmitter<LayersControlEvent>();
    this.overlayAdd = new EventEmitter<LayersControlEvent>();
    this.overlayRemove = new EventEmitter<LayersControlEvent>();
    this.layerAdd = new EventEmitter<LayerEvent>();
    this.layerRemove = new EventEmitter<LayerEvent>();
    this.zoomLevelsChange = new EventEmitter<Event>();
    this.resize = new EventEmitter<ResizeEvent>();
    this.unload = new EventEmitter<Event>();
    this.viewReset = new EventEmitter<Event>();
    this.load = new EventEmitter<Event>();
    this.zoomStart = new EventEmitter<Event>();
    this.moveStart = new EventEmitter<Event>();
    this.zoom = new EventEmitter<Event>();
    this.move = new EventEmitter<Event>();
    this.zoomEnd = new EventEmitter<Event>();
    this.moveEnd = new EventEmitter<Event>();

    this.subscription = new Subscription();
  }

  //#endregion

  //#region Methods

  public ngOnInit(): void {

    const buildMapSubscription = this._buildMapSubject
      .pipe(
        switchMap(() => {
          let getKeyObservable: Observable<string> = of(this._key);
          if (!this._key && this.mapKeyResolver && this.mapKeyResolver.getMapQuestKeyAsync) {
            getKeyObservable = this.mapKeyResolver.getMapQuestKeyAsync();
          }

          return getKeyObservable
            .pipe(
              tap(key => {
                this._key = key;

                L.mapquest.key = key;
                const mapControl = L.mapquest.map(this.elementRef.nativeElement, this._options || {
                  center: [0, 0],
                  layers: L.mapquest.tileLayer('map'),
                  zoom: 12
                });

                mapControl.addEventListener('baselayerchange', (event: LayersControlEvent) => this.baseLayerChange.emit(event));
                mapControl.addEventListener('overlayadd', (event: LayersControlEvent) => this.overlayAdd.emit(event));
                mapControl.addEventListener('overlayremove', (event: LayersControlEvent) => this.overlayRemove.emit(event));
                mapControl.addEventListener('layeradd', (event: LayerEvent) => this.layerAdd.emit(event));
                mapControl.addEventListener('layerremove', (event: LayerEvent) => this.layerRemove.emit(event));
                mapControl.addEventListener('zoomlevelschange', (event: Event) => this.zoomLevelsChange.emit(event));
                mapControl.addEventListener('resize', (event: ResizeEvent) => this.resize.emit(event));
                mapControl.addEventListener('unload', (event: Event) => this.unload.emit(event));
                mapControl.addEventListener('viewreset', (event: Event) => this.viewReset.emit(event));
                mapControl.addEventListener('load', (event: Event) => this.load.emit(event));
                mapControl.addEventListener('load', (event: Event) => this.load.emit(event));
                mapControl.addEventListener('zoomstart', (event: Event) => this.zoomStart.emit(event));
                mapControl.addEventListener('movestart', (event: Event) => this.moveStart.emit(event));
                mapControl.addEventListener('zoom', (event: Event) => this.zoom.emit(event));
                mapControl.addEventListener('move', (event: Event) => this.move.emit(event));
                mapControl.addEventListener('zoomend', (event: Event) => this.zoomEnd.emit(event));
                mapControl.addEventListener('moveend', (event: Event) => this.moveEnd.emit(event));

                this._mapControl = mapControl;
              })
            );
        })
      )
      .subscribe();
    this.subscription.add(buildMapSubscription);

    // Build the map.
    this._buildMapSubject.next();
  }

  public ngAfterViewInit(): void {

  }

  public ngAfterContentInit(): void {

    // Build markers.
    this.buildMarkers();

    // Build circles
    this.buildCircles();

    // Build polygons.
    this.buildPolygons();

    this.markers.changes.subscribe(value => {
      console.log(value);
    });

    this.circles.changes.subscribe(value => {
      console.log(value);
    });

  }

  //#endregion

  //#region Internal methods

  protected buildMarkers(): void {

    if (!this._mapControl) {
      return;
    }

    // Remove the added markers.
    if (this._addedMarkers && this._addedMarkers.length) {
      for (const addedMarker of this._addedMarkers) {
        this._mapControl.removeLayer(addedMarker);
      }

      this._addedMarkers.splice(0);
    }

    for (const marker of this.markers) {

      const addedMarker = L.marker(marker.coordinate, marker.options)
        .addTo(this._mapControl);

      this._mapControl.addLayer(addedMarker);
      this._addedMarkers.push(addedMarker);
    }
  }

  protected buildCircles(): void {
    if (!this._mapControl) {
      return;
    }

    // Remove the added markers.
    if (this._addedCircles && this._addedCircles.length) {
      for (const addedCircle of this._addedCircles) {
        this._mapControl.removeLayer(addedCircle);
      }

      this._addedCircles.splice(0);
    }

    for (const circle of this.circles) {

      const addedCircle = L.circle(circle.coordinate, circle.options)
        .addTo(this._mapControl);

      this._mapControl.addLayer(addedCircle);
      this._addedCircles.push(addedCircle);
    }
  }

  protected buildPolygons(): void {
    if (!this._mapControl) {
      return;
    }

    // Remove the added markers.
    if (this._addedPolygons && this._addedPolygons.length) {
      for (const addedPolygon of this._addedPolygons) {
        this._mapControl.removeLayer(addedPolygon);
      }

      this._addedPolygons.splice(0);
    }

    for (const polygon of this.polygons) {

      const addedPolygon = L.polygon(polygon.points, polygon.options)
        .addTo(this._mapControl);

      this._mapControl.addLayer(addedPolygon);
      this._addedCircles.push(addedPolygon);
    }
  }

  //#endregion
}
