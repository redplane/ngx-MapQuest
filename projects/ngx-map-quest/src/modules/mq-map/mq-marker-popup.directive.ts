import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {MqMarkerDirective} from './mq-marker.directive';
import {Subject, Subscription} from 'rxjs';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'mq-marker mq-marker-popup'
})
export class MqMarkerPopupDirective implements OnInit, OnDestroy {

  //#region Properties

  private _content: string;

  private readonly _updatePopupSubject: Subject<void>;

  // Subscription about marker popup update.
  private _updatePopupSubscription: Subscription;

  private readonly _subscription: Subscription;

  //#endregion

  //#region Accessors

  @Input()
  public set content(value: string) {
    this._content = value;
    this._updatePopupSubject.next();
  }

  //#endregion


  //#region Constructor

  public constructor(protected readonly mqMarker: MqMarkerDirective) {
    this._updatePopupSubject = new Subject<void>();
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Life cycle

  public ngOnInit(): void {

    const markerReadySubscription = this.mqMarker
      .readyEvent
      .subscribe(() => {

        this._updatePopupSubscription?.unsubscribe();
        this._updatePopupSubscription = this._updatePopupSubject
          .subscribe(() => {
            // Detach the current popup.
            this.mqMarker.instance().unbindPopup();

            // Bind a new one.
            this.mqMarker.instance().bindPopup(this._content);
          });
        this._subscription.add(this._updatePopupSubscription);
        this._updatePopupSubject.next();
      });
    this._subscription.add(markerReadySubscription);
  }

  public ngOnDestroy() {

    // Unsubscribe the subscription.
    this._subscription?.unsubscribe();

    // Unbind the popup.
    this.mqMarker.instance().unbindPopup();
  }

  //#endregion
}
