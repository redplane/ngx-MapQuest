import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {IMessageBusService} from '../interfaces/message-bus-service.interface';

@Injectable()
export class MessageBusService implements IMessageBusService {

  //#region Properties

  // Map of channels & event emitter.
  private _mChannel: Map<string, Map<string, Subject<any>>>;

  //#endregion

  //#region Constructor

  /*
  * Initialize service with injectors.
  * */
  public constructor() {
    this._mChannel = new Map<string, Map<string, Subject<any>>>();
  }

  //#endregion

  //#region Methods

  /*
  * Add message channel event emitter.
  * */
  public addMessageChannel<T>(channelName: string, eventName: string): Subject<T> {

    // Find channel mapping.
    const mChannel = this._mChannel;

    // Channel is not available.
    let channelNameEventStreamMap: Map<string, Subject<any>>;

    if (mChannel.has(channelName)) {
      channelNameEventStreamMap = mChannel.get(channelName);
    } else {
      channelNameEventStreamMap = new Map<string, Subject<any>>();
      this._mChannel.set(channelName, channelNameEventStreamMap);
    }

    if (channelNameEventStreamMap.has(eventName)) {
      return channelNameEventStreamMap.get(eventName);
    }

    const stream = new BehaviorSubject(null);
    channelNameEventStreamMap.set(eventName, stream);
    return <Subject<T>>stream;
  }

  /*
  * Hook message event.
  * */
  public hookMessageChannel<T>(channelName: string, eventName: string): Subject<T> {

    const mChannel = this._mChannel;

    if (mChannel == null || !mChannel.has(channelName)) {
      this.addMessageChannel(channelName, eventName);
    }

    let channelNameToEventStreamMap = mChannel.get(channelName);
    if (channelNameToEventStreamMap == null) {
      channelNameToEventStreamMap = new Map<string, EventEmitter<any>>();
      mChannel.set(channelName, channelNameToEventStreamMap);
    }

    let emitter = channelNameToEventStreamMap.get(eventName);
    if (emitter == null) {
      emitter = new Subject<T>();
      channelNameToEventStreamMap.set(eventName, emitter);
    }

    return emitter;
  }

  /*
  * Publish message to event stream.
  * */
  public addMessage<T>(channelName: string, eventName: string, data: T): void {

    // Find the existing channel.
    const mChannel = this._mChannel;
    if (!mChannel) {
      return;
    }
    let channelNameToEventStreamMap = mChannel.get(channelName);
    let stream: Subject<any>;

    if (!channelNameToEventStreamMap) {
      stream = new BehaviorSubject(null);
      channelNameToEventStreamMap = new Map<string, EventEmitter<any>>();
      channelNameToEventStreamMap.set(eventName, stream);
    } else {
      stream = channelNameToEventStreamMap.get(eventName);
    }

    stream.next(data);
  }


  //#endregion

}
