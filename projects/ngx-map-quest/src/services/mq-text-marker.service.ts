import {Marker} from 'leaflet';
import {MqTextMarker} from '../models/entities/mq-text-marker';
import {EventEmitter} from '@angular/core';

export class MqTextMarkerService {

  //#region Properties

  // List of markers that have been added.
  private readonly _addedMarkers: MqTextMarker[];

  //#endregion

  //#region Events

  public readonly textMarkerAddedEvent: EventEmitter<MqTextMarker>;

  public readonly textMarkerDeleteEvent: EventEmitter<MqTextMarker>;

  //#endregion

  //#region Constructor

  public constructor() {
    this._addedMarkers = [];

    this.textMarkerAddedEvent = new EventEmitter<MqTextMarker>();
    this.textMarkerDeleteEvent = new EventEmitter<MqTextMarker>();
  }

  //#endregion

  //#region Methods

  public addMarker(id: string, marker: Marker): void {
    // Remove the previous marker.
    const itemIndex = this._addedMarkers.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
      this._addedMarkers.splice(itemIndex, 1);
    }

    const mqMarker = new MqTextMarker(id, marker);
    this._addedMarkers.push(mqMarker);
    this.textMarkerAddedEvent.emit(mqMarker);
  }

  public getMarker(id: string): MqTextMarker {
    return this._addedMarkers.find(x => x.id === id);
  }

  public getMarkers(): MqTextMarker[] {
    return this._addedMarkers;
  }

  public deleteMarker(id: string): void {
    const itemIndex = this._addedMarkers.findIndex(x => x.id === id);
    if (itemIndex < 0) {
      return;
    }

    const item = this._addedMarkers[itemIndex];
    this._addedMarkers.splice(itemIndex, 1);
    this.textMarkerDeleteEvent.emit(item);
  }

  //#endregion

}
