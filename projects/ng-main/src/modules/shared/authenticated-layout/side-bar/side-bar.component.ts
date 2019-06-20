import {Component, HostBinding, Inject, OnInit} from '@angular/core';
import {INgRxMessageBusService} from 'ngrx-message-bus';
import {Subscription} from 'rxjs';
import {MessageChannelConstant} from '../../../../constants/message-channel.constant';
import {MessageEventConstant} from '../../../../constants/message-event.constant';
import {filter, switchMap} from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ul[id="accordionSidebar"]',
  templateUrl: 'side-bar.component.html'
})
export class SideBarComponent implements OnInit {

  //#region Properties

  /*
  * Catch side-bar display message subscription.
  * */
  private _hookSideBarDisplayMessageSubscription: Subscription;

  /*
  * Whether side-bar is toggled or not.
  * */
  private _shouldSideBarHidden = true;

  /*
  * Instance that is used as component class.
  * */
  @HostBinding('class')
  public get hostClass(): string {

    const defaultClasses = ['navbar-nav', 'bg-gradient-primary', 'sidebar', 'sidebar-dark accordion'];
    let finalClasses = [];
    if (this._shouldSideBarHidden) {
      finalClasses = ['toggled'].concat(defaultClasses);
    } else {
      finalClasses = [...defaultClasses];
    }

    return finalClasses.join(' ');
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject('INgRxMessageBusService') protected messageBusService: INgRxMessageBusService) {

  }

  /*
  * Called when component is initialized.
  * */
  public ngOnInit(): void {

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

  //#endregion

  //#region Methods


  //#endregion
}
