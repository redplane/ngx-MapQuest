import { MQ_NAVIGATION_CONTROL_POSITION } from '../constants/data-types';

export class NavigationControlOptions {
  //#region Constructor

  public constructor(
    public readonly position: MQ_NAVIGATION_CONTROL_POSITION = 'topright',
    public readonly panDistance: number = 100,
    public title: string = 'Navigation'
  ) {}

  //#endregion
}
