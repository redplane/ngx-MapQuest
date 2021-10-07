import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {MqMapService} from '../../../services/mq-map.service';
import {Subject, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {v4 as uuid} from 'uuid';
import {MqMapComponent} from '../../mq-map/mq-map.component';

declare var L: any;
declare type MQ_IMAGE_LAYER_PROPERTY = 'options' | 'bounds' | 'imageUrl' | 'zIndex' | 'opacity';

@Directive({
  selector: 'mq-map mq-image-layer'
})
export class MqImageLayerDirective implements OnInit, OnDestroy {

  //#region Properties

  // Id of mq marker.
  private readonly _uuid: string;

  // Marker instance.
  private _instance: L.ImageOverlay;

  // Image url.
  private _imageUrl: string;

  // Z index
  private _zIndex: number;

  // Opacity
  private _opacity: number;

  // Coordinate of marker.
  private _bounds: L.LatLngBounds;

  // Option of marker.
  private _options: L.ImageOverlayOptions;

  // Subscription watch list.
  private _subscription: Subscription;

  // Raise event to update marker instance.
  private _settingChanged: Subject<MQ_IMAGE_LAYER_PROPERTY>;

  // Whether options must be changed or not.
  private _markOptionsToBeChanged = false;

  //#endregion

  //#region Accessors

  public get uuid(): string {
    return this._uuid;
  }

  @Input()
  public set imageUrl(value: string) {
    this._imageUrl = value;
    this._settingChanged.next('imageUrl');
  }

  public get imageUrl(): string {
    return this._imageUrl;
  }

  @Input()
  public set zIndex(value: number) {
    this._zIndex = value;
    this._settingChanged.next('zIndex');
  }

  @Input()
  public set opacity(value: number) {
    this._opacity = value;
    this._settingChanged.next('opacity');
  }

  @Input()
  public set bounds(value: L.LatLngBounds) {
    this._bounds = value;
    this._settingChanged.next('bounds');
  }

  public get bounds(): L.LatLngBounds {
    return this._bounds;
  }

  @Input()
  public set options(value: L.ImageOverlayOptions) {
    this._options = {...value};

    // Update the z-index.
    this._zIndex = value?.zIndex;
    this._opacity = value?.opacity;

    this._markOptionsToBeChanged = true;
    this._settingChanged.next('options');
  }

  public get options(): L.ImageOverlayOptions {
    return this._options;
  }

  public get instance(): L.ImageOverlay {
    return this._instance;
  }

  //#endregion

  //#region Constructor

  public constructor(protected readonly mqMapService: MqMapService,
                     protected readonly mapComponent: MqMapComponent) {

    this._uuid = uuid();

    this._settingChanged = new Subject<MQ_IMAGE_LAYER_PROPERTY>();
    this._subscription = new Subscription();
  }

  //#region Life cycle

  public ngOnInit(): void {

    const hookMapLoadedSubscription = this.mqMapService
      .mapLoadedEvent
      .pipe(
        filter(mapControl => mapControl === this.mapComponent.instance)
      )
      .subscribe(mapControl => {
        this._markOptionsToBeChanged = true;
        this.hookInstanceUpdateEvent();
        this._settingChanged.next('options');
      });
    this._subscription.add(hookMapLoadedSubscription);
  }

  public ngOnDestroy(): void {

    // Remove the marker from map when the component is destroyed.
    this._instance?.removeFrom(this.mapComponent.instance);

    this._subscription?.unsubscribe();
  }

  //#endregion

  //#region Methods

  protected hookInstanceUpdateEvent(): void {

    const hookInstanceUpdateSubscription = this._settingChanged
      .pipe(
        map((changeProperty: MQ_IMAGE_LAYER_PROPERTY) => {
          if (this._markOptionsToBeChanged) {
            return 'options';
          }

          return changeProperty;
        })
      )
      .subscribe(changedProperty => {
        switch (changedProperty) {

          case 'bounds':
            this._instance.setBounds(this._bounds);
            break;

          case 'imageUrl':
            this._instance.setUrl(this._imageUrl);
            break;

          case 'zIndex':
            this._instance.setZIndex(this._zIndex);
            break;

          case 'opacity':
            this._instance.setOpacity(this._opacity);
            break;

          case 'options':
            // Remove the previous instance.
            if (this._instance && this.mapComponent.instance) {
              this._instance.removeFrom(this.mapComponent.instance);
            }

            this._instance = L.imageOverlay(this._imageUrl, this._bounds, this._options);
            this._instance.addTo(this.mapComponent.instance);
            this._markOptionsToBeChanged = false;
            break;
        }
      });
    this._subscription.add(hookInstanceUpdateSubscription);
  }

  //#endregion

}
