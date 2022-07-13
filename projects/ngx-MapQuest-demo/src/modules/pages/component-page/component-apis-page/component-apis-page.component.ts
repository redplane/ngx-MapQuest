import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DetailedComponentViewModel} from '../../../../view-models/examples/detailed-component.view-model';
import {Subscription} from 'rxjs';
import {COMPONENT_PAGE_SERVICE} from '../../../../constants/injectors';
import {IComponentPageService} from '../../../../services/interfaces/component-page-service.interface';
import {cloneDeep} from 'lodash-es';

@Component({
  selector: 'component-apis-page',
  templateUrl: 'component-apis-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentApisPageComponent implements OnInit, OnDestroy {

  //#region Properties

  private __component: DetailedComponentViewModel;

  protected _subscription: Subscription;

  //#endregion

  //#region Accessors

  public get component(): DetailedComponentViewModel {
    return this.__component;
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(COMPONENT_PAGE_SERVICE)
                     protected readonly _componentPageService: IComponentPageService,
                     protected readonly _changeDetectorRef: ChangeDetectorRef) {
    this.__component = new DetailedComponentViewModel('', [], [], []);
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Life cycle hooks

  public ngOnInit(): void {
    const getComponentSubscription = this._componentPageService
      .getComponentAsync('')
      .subscribe((value: DetailedComponentViewModel) => {
        this.__component = cloneDeep(value);
        this._changeDetectorRef.markForCheck();
      });
    this._subscription.add(getComponentSubscription);
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  //#endregion

}
