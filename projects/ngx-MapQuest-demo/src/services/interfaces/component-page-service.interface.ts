import {Observable} from 'rxjs';
import {DetailedComponentViewModel} from '../../view-models/examples/detailed-component.view-model';

export interface IComponentPageService {

  //#region Methods

  getComponentAsync(componentName: string): Observable<DetailedComponentViewModel>;

  //#endregion

}
