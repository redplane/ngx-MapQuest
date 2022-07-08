import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Inject, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MessageChannelConstant} from '../../../../constants/message-channel.constant';
import {MessageEventConstant} from '../../../../constants/message-event.constant';
import {IMessageBusService, MESSAGE_BUS_SERVICE} from '@message-bus/core';

@Component({
  selector: 'ul[id="accordionSidebar"]',
  templateUrl: 'sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {

  //#region Properties

  // Catch sidebar display message subscription.
  private _hookSidebarDisplayMessageSubscription: Subscription;

  // Whether sidebar is toggled or not.
  private _shouldSidebarHidden = true;

  // Instance that is used as component class.
  @HostBinding('class')
  public get hostClass(): string {

    const defaultClasses = ['navbar-nav', 'bg-gradient-primary', 'sidebar', 'sidebar-dark accordion'];
    let finalClasses = [];
    if (this._shouldSidebarHidden) {
      finalClasses = ['toggled'].concat(defaultClasses);
    } else {
      finalClasses = [...defaultClasses];
    }

    return finalClasses.join(' ');
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(MESSAGE_BUS_SERVICE) protected messageBusService: IMessageBusService,
                     protected readonly _changeDetectorRef: ChangeDetectorRef) {

  }

  //#endregion

  //#region Methods

  // Called when component is initialized.
  public ngOnInit(): void {
    // Listen to sidebar toggle event in ui channel.
    this._hookSidebarDisplayMessageSubscription = this.messageBusService
      .hookMessageChannel(MessageChannelConstant.ui, MessageEventConstant.displaySidebar)
      .subscribe(shouldSideBarVisible => {
        this._shouldSidebarHidden = !shouldSideBarVisible;
        this._changeDetectorRef.markForCheck();
      });
  }

  //#endregion

  //#region Methods

  public clickSidebar(): void {
    this.messageBusService.addMessage(MessageChannelConstant.ui, MessageEventConstant.displaySidebar, true);
  }

  //#endregion
}
