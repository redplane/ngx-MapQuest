import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
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
import {cloneDeep, merge as lodashMerge} from 'lodash-es';
import {switchMap, tap} from 'rxjs/operators';
import {MqCircleDirective} from './mq-circle.directive';
import {MqPolygonDirective} from './mq-polygon.directive';
import {MqMapService} from '../../services/mq-map.service';
import {MqMarkerService} from '../../services/mq-marker.service';
import {MqSelectorIds} from '../../constants/mq-selector-ids';

declare var L: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mq-map',
  template: `
    <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    MqMapService,
    MqMarkerService
  ]
})
export class MqMapComponent implements OnInit, AfterViewInit, AfterContentInit {

  //#region Properties

  // Map control.
  private _mapControl: L.Map;

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

  @ContentChildren(MqCircleDirective, {emitDistinctChangesOnly: true, descendants: false})
  public circles: QueryList<MqCircleDirective>;

  @ContentChildren(MqPolygonDirective, {emitDistinctChangesOnly: true, descendants: false})
  public polygons: QueryList<MqPolygonDirective>;

  //#endregion

  //#region Accessors

  public get instance(): L.Map {
    return this._mapControl;
  }

  @Input()
  public set options(value: MapOptions) {
    this._options = cloneDeep(value);
  }

  //#endregion

  //#region Events

  @Output()
  public readonly baseLayerChange: EventEmitter<LayersControlEvent> = new EventEmitter<LayersControlEvent>();

  @Output()
  public readonly overlayAdd: EventEmitter<LayersControlEvent> = new EventEmitter<LayersControlEvent>();

  @Output()
  public readonly overlayRemove: EventEmitter<LayersControlEvent> = new EventEmitter<LayersControlEvent>();

  @Output()
  public readonly layerAdd: EventEmitter<LayerEvent> = new EventEmitter<LayerEvent>();

  @Output()
  public readonly layerRemove: EventEmitter<LayerEvent> = new EventEmitter<LayerEvent>();

  @Output()
  public readonly zoomLevelsChange: EventEmitter<Event> = new EventEmitter<Event>();

  @Output()
  public readonly resize: EventEmitter<ResizeEvent> = new EventEmitter<ResizeEvent>();

  @Output()
  public readonly unload: EventEmitter<Event> = new EventEmitter<Event>();

  @Output()
  public readonly viewReset: EventEmitter<Event> = new EventEmitter<Event>();

  @Output()
  public readonly loadEvent: EventEmitter<Event> = new EventEmitter<Event>();

  @Output()
  public readonly zoomStart: EventEmitter<Event> = new EventEmitter<Event>();

  @Output()
  public readonly moveStart: EventEmitter<Event> = new EventEmitter<Event>();

  @Output()
  public readonly zoom: EventEmitter<Event> = new EventEmitter<Event>();

  @Output()
  public readonly move: EventEmitter<Event> = new EventEmitter<Event>();

  @Output()
  public readonly zoomEnd: EventEmitter<Event> = new EventEmitter<Event>();

  @Output()
  public readonly moveEnd: EventEmitter<Event> = new EventEmitter<Event>();

  //#endregion

  //#region Constructor

  public constructor(protected elementRef: ElementRef,
                     @Inject(MAP_QUEST_KEY_RESOLVER_PROVIDER) protected mapKeyResolver: IMqMapKeyResolver,
                     protected readonly markerService: MqMarkerService,
                     protected readonly mqMapService: MqMapService) {

    this._mapControl = null;
    this._addedCircles = [];
    this._addedPolygons = [];

    this._buildMapSubject = new Subject<void>();

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
                const options = lodashMerge({
                  layers: L.mapquest.tileLayer('map'),
                  zoom: 12
                }, this._options);
                const mapControl = L.mapquest.map(this.elementRef.nativeElement, options);

                mapControl.addEventListener('baselayerchange', (event: LayersControlEvent) => this.baseLayerChange.emit(event));
                mapControl.addEventListener('overlayadd', (event: LayersControlEvent) => this.overlayAdd.emit(event));
                mapControl.addEventListener('overlayremove', (event: LayersControlEvent) => this.overlayRemove.emit(event));
                mapControl.addEventListener('layeradd', (event: LayerEvent) => this.layerAdd.emit(event));
                mapControl.addEventListener('layerremove', (event: LayerEvent) => this.layerRemove.emit(event));
                mapControl.addEventListener('zoomlevelschange', (event: Event) => this.zoomLevelsChange.emit(event));
                mapControl.addEventListener('resize', (event: ResizeEvent) => this.resize.emit(event));
                mapControl.addEventListener('unload', (event: Event) => this.unload.emit(event));
                mapControl.addEventListener('viewreset', (event: Event) => this.viewReset.emit(event));
                mapControl.addEventListener('load', (event: Event) => this.loadEvent.emit(event));
                mapControl.addEventListener('zoomstart', (event: Event) => this.zoomStart.emit(event));
                mapControl.addEventListener('movestart', (event: Event) => this.moveStart.emit(event));
                mapControl.addEventListener('zoom', (event: Event) => this.zoom.emit(event));
                mapControl.addEventListener('move', (event: Event) => this.move.emit(event));
                mapControl.addEventListener('zoomend', (event: Event) => this.zoomEnd.emit(event));
                mapControl.addEventListener('moveend', (event: Event) => this.moveEnd.emit(event));

                this._mapControl = mapControl;
                this.mqMapService.markMapAsLoaded(this._mapControl);
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

    // Build circles
    this.buildCircles();

    // Build polygons.
    this.buildPolygons();

    this.circles.changes.subscribe(value => {
      console.log(value);
    });

  }

  //#endregion

  //#region Internal methods

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
