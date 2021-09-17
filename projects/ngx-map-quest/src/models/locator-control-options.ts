import {MQ_LOCATOR_CONTROL_POSITION} from '../constants/data-types';

export class LocatorControlOptions {

  //#region Constructor

  public constructor(public readonly className?: string,
                     public readonly defaultLocation?: Position,
                     public readonly enableHighAccuracy: boolean = true,
                     public readonly markerPrimaryColor: string = '#333333',
                     public readonly markerSecondaryColor: string = '#b7b7b7',
                     public readonly position: MQ_LOCATOR_CONTROL_POSITION = 'topright',
                     public readonly timeout: number = 5000,
                     public readonly title: string = 'Locator',
                     public readonly zoom: number = 16) {
  }

  //#endregion

}
