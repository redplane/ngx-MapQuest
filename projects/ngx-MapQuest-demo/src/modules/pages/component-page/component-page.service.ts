import {IComponentPageService} from '../../../services/interfaces/component-page-service.interface';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {DetailedComponentViewModel} from '../../../view-models/examples/detailed-component.view-model';
import {PropertyViewModel} from '../../../view-models/examples/property.view-model';
import {EventViewModel} from '../../../view-models/examples/event.view-model';
import {UseCaseViewModel} from '../../../view-models/examples/use-case.view-model';

@Injectable()
export class ComponentPageService implements IComponentPageService {

  //#region Constructor

  //#endregion

  //#region Methods

  public getComponentAsync(componentName: string)
    : Observable<DetailedComponentViewModel> {

    const componentProperties = [
      new PropertyViewModel('Property 001', 'Description 001', 0),
      new PropertyViewModel('Property 002', 'Description 002', 0),
      new PropertyViewModel('Property 003', 'Description 003', 0),
      new PropertyViewModel('Property 004', 'Description 004', 0)
    ];

    const properties = [
      new PropertyViewModel('Property 001', 'Description 001', 0),
      new PropertyViewModel('Property 002', 'Description 002', 0),
      new PropertyViewModel('Property 003', 'Description 003', 0),
      new PropertyViewModel('Property 004', 'Description 004', 0)
    ];

    const events = [
      new EventViewModel('Event 001', 'Description 001', properties),
      new EventViewModel('Event 002', 'Description 002', properties),
      new EventViewModel('Event 003', 'Description 003', properties),
      new EventViewModel('Event 004', 'Description 004', properties)
    ];

    const useCases = [];
    useCases.push(new UseCaseViewModel('Title 001', 'Content 001', 'http://localhost:abc.com'));
    useCases.push(new UseCaseViewModel('Title 002', 'Content 002', 'http://localhost:abc.com'));
    useCases.push(new UseCaseViewModel('Title 003', 'Content 003', 'http://localhost:abc.com'));
    useCases.push(new UseCaseViewModel('Title 004', 'Content 004', 'http://localhost:abc.com'));
    useCases.push(new UseCaseViewModel('Title 005', 'Content 005', 'http://localhost:abc.com'));


    const component = new DetailedComponentViewModel('Title 001', componentProperties, events, useCases);
    return of(component);
  }

  //#endregion

}
