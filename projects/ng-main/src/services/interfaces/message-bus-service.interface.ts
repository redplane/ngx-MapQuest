import {EventEmitter} from '@angular/core';
import {Subject} from 'rxjs';

// A small message queue channels - messages management.
// This service which helps components to send and receive messages asynchronously.
export interface IMessageBusService {

  //#region Methods

  // Add message channel.
  addMessageChannel<T>(channelName: string, eventName: string): Subject<T>;

  // Hook message event.
  hookMessageChannel<T>(channelName: string, eventName: string): Subject<T>;

  // Publish message to event stream.
  addMessage<T>(channelName: string, eventName: string, data?: T): void;

  //#endregion

}
