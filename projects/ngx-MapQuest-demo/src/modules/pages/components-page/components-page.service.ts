import {IComponentsPageService} from '../../../services/interfaces/components-page-service.interface';
import {Injectable} from '@angular/core';
import {ComponentViewModel} from '../../../view-models/examples/component.view-model';
import {Observable, of} from 'rxjs';

@Injectable()
export class ComponentsPageService implements IComponentsPageService {

  //#region Methods

  public getComponentsAsync(): Observable<ComponentViewModel[]> {
    const examples = [];
    examples.push(new ComponentViewModel('Card 01'));
    examples.push(new ComponentViewModel('Card 02'));
    examples.push(new ComponentViewModel('Card 03'));
    examples.push(new ComponentViewModel('Card 04'));
    examples.push(new ComponentViewModel('Card 05'));

    return of(examples);
  }

  //#endregion

}
