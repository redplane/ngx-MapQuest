import {HoverIconOptions} from './hover-icon-options';

export class HoverMarkerOptions {

  //#region Constructor

  public constructor(public readonly icon: string = 'marker',
                     public readonly iconOptions: HoverIconOptions = new HoverIconOptions()) {
  }

  //#endregion

}
