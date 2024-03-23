import { Marker } from 'leaflet';
import { MqMarker } from '../models/entities/mq-marker';
import { EventEmitter } from '@angular/core';

export class MqMarkerService {
  //#region Properties

  // List of markers that have been added.
  private readonly _addedMarkers: MqMarker[];

  //#endregion

  //#region Events

  public readonly markerAddedEvent: EventEmitter<MqMarker>;

  public readonly markerDeleteEvent: EventEmitter<MqMarker>;

  //#endregion

  //#region Constructor

  public constructor() {
    this._addedMarkers = [];

    this.markerAddedEvent = new EventEmitter<MqMarker>();
    this.markerDeleteEvent = new EventEmitter<MqMarker>();
  }

  //#endregion

  //#region Methods

  public addMarker(id: string, marker: Marker): void {
    // Remove the previous marker.
    const itemIndex = this._addedMarkers.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      this._addedMarkers.splice(itemIndex, 1);
    }

    const mqMarker = new MqMarker(id, marker);
    this._addedMarkers.push(mqMarker);
    this.markerAddedEvent.emit(mqMarker);
  }

  public getMarker(id: string): MqMarker {
    return this._addedMarkers.find((x) => x.id === id);
  }

  public getMarkers(): MqMarker[] {
    return this._addedMarkers;
  }

  public deleteMarker(id: string): void {
    const itemIndex = this._addedMarkers.findIndex((x) => x.id === id);
    if (itemIndex < 0) {
      return;
    }

    const item = this._addedMarkers[itemIndex];
    this._addedMarkers.splice(itemIndex, 1);
    this.markerDeleteEvent.emit(item);
  }

  //#endregion
}
