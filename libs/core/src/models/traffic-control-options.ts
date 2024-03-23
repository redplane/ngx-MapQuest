import { MQ_TRAFFIC_CONTROL_POSITION } from '../constants/data-types';

export class TrafficControlOptions {
  //#region Constructor

  public constructor(
    public readonly className?: string,
    public readonly colors?: 'low' | 'medium' | 'high' | 'closed',
    public readonly construction: boolean = true,
    public readonly flow: boolean = true,
    public readonly incident: boolean = true,
    public readonly position: MQ_TRAFFIC_CONTROL_POSITION = 'topright',
    public readonly markets: boolean = true,
    public readonly title: string = 'Traffic'
  ) {}

  //#endregion
}
