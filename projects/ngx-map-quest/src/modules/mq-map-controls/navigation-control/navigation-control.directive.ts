import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {cloneDeep} from 'lodash-es';
import {MqMapComponent} from '../../mq-map/mq-map.component';
import {MqMapService} from '../../../services/mq-map.service';
import {debounceTime} from 'rxjs/operators';
import {NavigationControlOptions} from '../../../models/navigation-control-options';

declare var L: any;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'mq-map mq-control-navigation'
})
export class NavigationControlDirective implements OnInit, OnDestroy {

  //#region Properties

  private _options: NavigationControlOptions;

  // Instance of satellite control
  private _instance: L.Control;

  // Raised when option is changed.
  private readonly _optionChangedSubject: Subject<void>;

  // Subscription of hooking option changed.
  private _hookOptionChangedSubscription: Subscription;

  // Subscription watch list.
  private readonly _subscription: Subscription;

  //#endregion

  //#region Accessors

  public get options(): NavigationControlOptions {
    return this._options;
  }

  @Input()
  public set options(value: NavigationControlOptions) {
    this._options = cloneDeep(value);
    this._optionChangedSubject.next();
  }

  //#endregion

  //#region Constructor

  public constructor(protected readonly mqMap: MqMapComponent,
                     protected readonly mqMapService: MqMapService) {
    this._optionChangedSubject = new Subject<void>();
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Life cycles

  public ngOnInit(): void {

    const hookMapLoadedEventSubscription = this.mqMapService
      .mapLoadedEvent
      .subscribe(mapControl => {
        if (this._instance && mapControl) {
          mapControl.removeControl(this._instance);
        }

        this._instance = L.mapquest.navigationControl(this._options);
        mapControl.addControl(this._instance);
        this.hookOptionChangedEvent();
      });
    this._subscription.add(hookMapLoadedEventSubscription);

  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();

    if (this._instance && this.mqMap.instance) {
      this.mqMap.instance.removeControl(this._instance);
      this._instance = null;
    }
  }

  //#endregion

  //#region Methods

  //#endregion

  //#region Internal methods

  protected hookOptionChangedEvent(): void {
    this._hookOptionChangedSubscription?.unsubscribe();
    this._hookOptionChangedSubscription = this._optionChangedSubject
      .pipe(
        debounceTime(200)
      )
      .subscribe(() => {
        if (this._instance && this.mqMap.instance) {
          this.mqMap.instance.removeControl(this._instance);
        }

        this._instance = L.mapquest.satelliteControl(this._options);
        this.mqMap.instance.addControl(this._instance);
      });
    this._subscription.add(this._hookOptionChangedSubscription);

  }

  //#endregion
}
