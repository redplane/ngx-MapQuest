import {Observable} from 'rxjs';
import {ComponentViewModel} from '../../view-models/examples/component.view-model';

export interface IComponentsPageService {

  //#region Methods

  getComponentsAsync(): Observable<ComponentViewModel[]>;

  //#endregion

}
