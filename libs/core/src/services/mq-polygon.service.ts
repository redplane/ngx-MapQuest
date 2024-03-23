import { EventEmitter } from '@angular/core';
import { Polygon } from 'leaflet';
import { MqPolygon } from '../models/entities/mq-polygon';

export class MqPolygonService {
  //#region Properties

  // List of markers that have been added.
  private readonly _addedPolygons: MqPolygon[];

  //#endregion

  //#region Events

  public readonly itemAddedEvent: EventEmitter<MqPolygon>;

  public readonly itemDeletedEvent: EventEmitter<MqPolygon>;

  //#endregion

  //#region Constructor

  public constructor() {
    this._addedPolygons = [];

    this.itemAddedEvent = new EventEmitter<MqPolygon>();
    this.itemDeletedEvent = new EventEmitter<MqPolygon>();
  }

  //#endregion

  //#region Methods

  public addItem(id: string, item: Polygon): void {
    // Remove the previous marker.
    const itemIndex = this._addedPolygons.findIndex((x) => x.id === id);
    if (itemIndex !== -1) {
      this._addedPolygons.splice(itemIndex, 1);
    }

    const entity = new MqPolygon(id, item);
    this._addedPolygons.push(entity);
    this.itemAddedEvent.emit(entity);
  }

  public getItem(id: string): MqPolygon {
    return this._addedPolygons.find((x) => x.id === id);
  }

  public getItems(): MqPolygon[] {
    return this._addedPolygons;
  }

  public deleteItem(id: string): void {
    const itemIndex = this._addedPolygons.findIndex((x) => x.id === id);
    if (itemIndex < 0) {
      return;
    }

    const item = this._addedPolygons[itemIndex];
    this._addedPolygons.splice(itemIndex, 1);
    this.itemDeletedEvent.emit(item);
  }

  //#endregion
}
