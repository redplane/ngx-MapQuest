import {Injectable} from '@angular/core';
import {TextMarker} from '../../models/text-marker';
import {v4 as uuid} from 'uuid';

@Injectable()
export class TextMarkerStorageService {

  //#region Properties

  protected readonly items: TextMarker[];

  //#endregion

  //#region Constructor

  public constructor() {

    // Items initialization.
    this.items = [];

    // Text marker initialization.
    const thuongMarketTextMarker = new TextMarker(uuid(), {lat: 21.2698658, lng: 106.1902295}, {
      text: 'Coffee Shop',
      subtext: 'At Thuong market',
      position: 'right',
      type: 'marker',
      icon: {
        primaryColor: '#333333',
        secondaryColor: '#333333',
        size: 'sm'
      }
    });
    this.items.push(thuongMarketTextMarker);

    const hoangHoaThamPark = new TextMarker(uuid(), {lat: 21.2667035, lng: 106.205187}, {
      text: 'Hoang Hoa Tham park',
      subtext: 'Central park (sub text)',
      draggable: true,
      position: 'left',
      type: 'via'
    });
    this.items.push(hoangHoaThamPark);
  }

  //#endregion

  //#region Methods

  public getTextMarkers(): TextMarker[] {
    return this.items;
  }

  //#endregion
}
