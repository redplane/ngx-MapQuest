import {PropertyViewModel} from './property.view-model';
import {EventViewModel} from './event.view-model';
import {UseCaseViewModel} from './use-case.view-model';

export class DetailedComponentViewModel {

  //#region Constructor

  public constructor(public readonly title: string,
                     public readonly properties: PropertyViewModel[],
                     public readonly events: EventViewModel[],
                     public readonly useCases: UseCaseViewModel[]) {
  }

  //#endregion

}
