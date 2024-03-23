import { EventEmitter } from '@angular/core';
import { CircleMarker } from 'leaflet';
import { MqCircle } from '../models/entities/mq-circle';

export class MqCircleService {
  //#region Properties

  // List of markers that have been added.
  private readonly _addedMarkers: MqCircle[];

  //#endregion

  //#region Events

  public readonly markerAddedEvent: EventEmitter<MqCircle>;

  public readonly markerDeleteEvent: EventEmitter<MqCircle>;

  //#endregion

  //#region Constructor

  public constructor() {
    this._addedMarkers = [];

    this.markerAddedEvent = new EventEmitter<MqCircle>();
    this.markerDeleteEvent = new EventEmitter<MqCircle>();
  }

  //#endregion

  //#region Methods

  public addMarker(id: string, marker: CircleMarker): void {
    // Remove the previous marker.
    const itemIndex = this._addedMarkers.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      this._addedMarkers.splice(itemIndex, 1);
    }

    const mqMarker = new MqCircle(id, marker);
    this._addedMarkers.push(mqMarker);
    this.markerAddedEvent.emit(mqMarker);
  }

  public getMarker(id: string): MqCircle {
    return this._addedMarkers.find((x) => x.id === id);
  }

  public getMarkers(): MqCircle[] {
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
