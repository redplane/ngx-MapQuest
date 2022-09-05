import {MQ_HOVER_ICON_SIZE} from '../constants/data-types';

export class HoverIconOptions {

  //#region Constructor

  public constructor(public readonly primaryColor?: string,
                     public readonly secondaryColor?: string,
                     public readonly size: MQ_HOVER_ICON_SIZE = 'sm') {
  }

  //#endregion

}
