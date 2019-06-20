import {Component, HostBinding, Inject, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {INgRxMessageBusService} from 'ngrx-message-bus';
import {Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs/operators';
import {MessageChannelConstant} from '../constants/message-channel.constant';
import {MessageEventConstant} from '../constants/message-event.constant';
import {TranslateService} from '@ngx-translate/core';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'app';

  //#region Properties

  /*
  * Subscription about page body update.
  * */
  private _hookPageBodyUpdateEventSubscription: Subscription;

  /*
  * Catch side-bar display message subscription.
  * */
  private _hookSideBarDisplayMessageSubscription: Subscription;

  /*
  * Base host class.
  * */
  private _hostClass: string;

  /*
  * Class that applied to whole page.
  * */
  @HostBinding('class')
  public get hostClass(): string {

    // Initialize output class.
    let outputHostClass = this._hostClass;
    if (!outputHostClass) {
      outputHostClass = '';
    }

    if (this._shouldSideBarHidden) {
      outputHostClass += ' sidebar-toggled';
    }

    return outputHostClass;
  }

  /*
  * Should side-bar be hidden or not.
  * */
  private _shouldSideBarHidden = true;

  //#endregion

  //#region Constructor

  public constructor(protected router: Router,
                     @Inject('INgRxMessageBusService') protected messageBusService: INgRxMessageBusService,
                     protected translateService: TranslateService) {
    this.translateService.use('en-US');
  }

  //#endregion

  //#region Methods

  /*
  * Called when component is being initiated.
  * */
  public ngOnInit(): void {

    // Hook to update page class event in ui channel.
    this._hookPageBodyUpdateEventSubscription = this.messageBusService
      .channelAddedEvent
      .pipe(
        filter((model: { channelName: string, eventName: string }) => {
          return model.channelName === MessageChannelConstant.ui && model.eventName === MessageEventConstant.updatePageClass;
        }),
        switchMap((model: { channelName: string, eventName: string }) => {
          return this.messageBusService
            .hookMessageChannel(model.channelName, model.eventName)
            .pipe(
              distinctUntilChanged(),
              debounceTime(150)
            );
        })
      )
      .subscribe((updatedClass: string) => {

        if (!updatedClass) {
          return;
        }

        this._hostClass = updatedClass;
      });

    // Listen to side-bar toggle event in ui channel.
    this._hookSideBarDisplayMessageSubscription = this.messageBusService
      .channelAddedEvent
      .pipe(
        filter((model: { channelName: string, eventName: string }) => {
          return model.channelName === MessageChannelConstant.ui && model.eventName === MessageEventConstant.displaySidebar;
        }),
        switchMap((model: { channelName: string, eventName: string }) => {
          return this.messageBusService
            .hookMessageChannel<boolean>(model.channelName, model.eventName);
        })
      )
      .subscribe(shouldSideBarVisible => {
        this._shouldSideBarHidden = !shouldSideBarVisible;
      });
  }

  /*
  * Called when component is destroyed.
  * */
  public ngOnDestroy(): void {

    // Unsubscribe created subscription to prevent memory leaks.
    if (this._hookPageBodyUpdateEventSubscription && !this._hookPageBodyUpdateEventSubscription.closed) {
      this._hookPageBodyUpdateEventSubscription.unsubscribe();
    }

    if (this._hookSideBarDisplayMessageSubscription && !this._hookSideBarDisplayMessageSubscription.closed) {
      this._hookSideBarDisplayMessageSubscription.unsubscribe();
    }
  }


  //#endregion
}
