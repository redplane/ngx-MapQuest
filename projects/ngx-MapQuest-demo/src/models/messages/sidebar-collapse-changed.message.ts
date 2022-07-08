import {TypedChannelEvent} from '@message-bus/core';
import {MessageChannelNames} from '../../constants/message-channel-names';
import {SidebarEventNames} from '../../constants/event-names/sidebar-event-names';

export class SidebarCollapseChangedMessage extends TypedChannelEvent<boolean> {

  //#region Properties

  public readonly channelName: string;

  public readonly eventName: string;

  //#endregion

  //#region Constructor

  public constructor() {
    super();

    this.channelName = MessageChannelNames.sidebar;
    this.eventName = SidebarEventNames.collapseChanged;
  }

  //#endregion
}
