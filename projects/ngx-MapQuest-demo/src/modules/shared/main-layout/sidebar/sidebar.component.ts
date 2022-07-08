import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Inject, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {IMessageBusService, MESSAGE_BUS_SERVICE} from '@message-bus/core';
import {SidebarCollapseChangedMessage} from '../../../../models/messages/sidebar-collapse-changed.message';

@Component({
  selector: 'ul[id="accordionSidebar"]',
  templateUrl: 'sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {

  //#region Properties

  // Catch sidebar display message subscription.
  private _hookSidebarCollapseChangedSubscription: Subscription;

  // Whether sidebar is toggled or not.
  private __collapsed = true;

  // Instance that is used as component class.
  @HostBinding('class')
  public get hostClass(): string {

    const defaultClasses = ['navbar-nav', 'bg-gradient-primary', 'sidebar', 'sidebar-dark accordion'];
    let finalClasses = [];
    if (this.__collapsed) {
      finalClasses = ['toggled'].concat(defaultClasses);
    } else {
      finalClasses = [...defaultClasses];
    }

    return finalClasses.join(' ');
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(MESSAGE_BUS_SERVICE) protected _messageBusService: IMessageBusService,
                     protected readonly _changeDetectorRef: ChangeDetectorRef) {

  }

  //#endregion

  //#region Methods

  // Called when component is initialized.
  public ngOnInit(): void {

    this._messageBusService.addTypedMessage(new SidebarCollapseChangedMessage(), this.__collapsed);

    // Listen to sidebar toggle event in ui channel.
    this._hookSidebarCollapseChangedSubscription = this._messageBusService
      .hookTypedMessageChannel(new SidebarCollapseChangedMessage())
      .subscribe((collapsed: boolean) => {
        this.__collapsed = collapsed;
        this._changeDetectorRef.markForCheck();
      });
  }

  //#endregion

  //#region Methods

  public clickSidebar(): void {
    this._messageBusService.addTypedMessage(new SidebarCollapseChangedMessage(), !this.__collapsed);
  }

  //#endregion
}
