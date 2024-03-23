import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileViewModel } from '../../../../view-models/profile.view-model';
import { MessageChannelConstant } from '../../../../constants/message-channel.constant';
import { MessageEventConstant } from '../../../../constants/message-event.constant';
import { SERVICE__UI } from '../../../../constants/app-injection-tokens';
import { IMessageBusService, MESSAGE_BUS_SERVICE } from '@message-bus/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[navigation-bar]',
  templateUrl: 'navigation-bar.component.html',
})
export class NavigationBarComponent {
  //#region Properties

  // Account property.
  // tslint:disable-next-line:no-input-rename
  @Input('profile')
  public profile: ProfileViewModel;

  /*
   * Whether sidebar should be visible or not.
   * */
  public shouldSidebarVisible = false;

  //#endregion

  //#region Constructor

  // Initiate instance with IoC.
  public constructor(
    @Inject(MESSAGE_BUS_SERVICE)
    protected readonly _messageBusService: IMessageBusService
  ) {}

  //#endregion

  //#region Methods

  /*
   * Called when sidebar toggle button is clicked.
   * */
  public clickSideBarToggle(): void {
    // Change sidebar visibility to opposite state.
    this.shouldSidebarVisible = !this.shouldSidebarVisible;

    // TODO: Implement message bus.
    this._messageBusService.addMessage<boolean>(
      MessageChannelConstant.ui,
      MessageEventConstant.displaySidebar,
      this.shouldSidebarVisible
    );
  }

  //#endregion
}
