import {PropertyViewModel} from './property.view-model';

export class EventViewModel {

  //#region Constructor

  public constructor(public readonly name: string,
                     public readonly description: string,
                     public readonly properties: PropertyViewModel[]) {
  }

  //#endregion

}
