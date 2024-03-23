import { Observable, ReplaySubject, Subject } from 'rxjs';

export class MqMapService {
  //#region Properties

  // Initialize subject.
  private readonly _mapLoadedSubject: Subject<L.Map>;

  // Called when map is initialized.
  public readonly mapLoadedEvent: Observable<L.Map>;

  //#endregion

  //#region Constructor

  public constructor() {
    this._mapLoadedSubject = new ReplaySubject<L.Map>();
    this.mapLoadedEvent = this._mapLoadedSubject.asObservable();
  }

  //#endregion

  //#region Methods

  public markMapAsLoaded(control: L.Map): void {
    this._mapLoadedSubject.next(control);
  }

  //#endregion
}
