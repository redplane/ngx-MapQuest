import {Component, HostBinding, Inject, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MessageChannelConstant} from '../../../../constants/message-channel.constant';
import {MessageEventConstant} from '../../../../constants/message-event.constant';
import {filter, switchMap} from 'rxjs/operators';
import {INgRxMessageBusService, MESSAGE_BUS_SERVICE_PROVIDER} from 'ngrx-message-bus';

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

  public constructor(@Inject(MESSAGE_BUS_SERVICE_PROVIDER) protected messageBusService: INgRxMessageBusService) {

  }

  //#endregion

  //#region Methods

  // Called when component is initialized.
  public ngOnInit(): void {

    // TODO: Listen to side bar
    // Listen to side-bar toggle event in ui channel.
    this._hookSideBarDisplayMessageSubscription = this.messageBusService
      .hookMessageChannel(MessageChannelConstant.ui, MessageEventConstant.displaySidebar)
      .subscribe(shouldSideBarVisible => {
        this._shouldSideBarHidden = !shouldSideBarVisible;
        console.log(this._shouldSideBarHidden);
      });
  }

  //#endregion

  //#region Methods

  public clickSidebar(): void {
    this.messageBusService.addMessage(MessageChannelConstant.ui, MessageEventConstant.displaySidebar, true);
  }

  //#endregion
}
