import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Inject, OnDestroy, OnInit} from '@angular/core';
import {IMessageBusService, MESSAGE_BUS_SERVICE} from '@message-bus/core';
import {Subscription} from 'rxjs';
import {SidebarCollapseChangedMessage} from '../../../models/messages/sidebar-collapse-changed.message';
import {COMPONENT_PAGE_SERVICE} from '../../../constants/injectors';
import {IComponentPageService} from '../../../services/interfaces/component-page-service.interface';
import {DetailedComponentViewModel} from '../../../view-models/examples/detailed-component.view-model';
import {cloneDeep} from 'lodash-es';

@Component({
  selector: 'component-page',
  templateUrl: 'component-page.component.html',
  styleUrls: ['component-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentPageComponent implements OnInit, OnDestroy {

  //#region Properties

  // Whether sidebar has been collapsed or not.
  private __collapse = false;

  private __component: DetailedComponentViewModel
    = new DetailedComponentViewModel('', [], [], []);

  protected readonly _subscription = new Subscription();

  //#endregion

  //#region Accessors

  public get collapse(): boolean {
    return this.__collapse;
  }

  public get component(): DetailedComponentViewModel {
    return this.__component;
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(MESSAGE_BUS_SERVICE)
                     protected readonly _messageBusService: IMessageBusService,
                     @Inject(COMPONENT_PAGE_SERVICE)
                     protected readonly _componentPageService: IComponentPageService,
                     protected readonly _changeDetectorRef: ChangeDetectorRef) {
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

    const hookSidebarCollapseSubscription = this._messageBusService
      .hookTypedMessageChannel(new SidebarCollapseChangedMessage())
      .subscribe((collapse: boolean) => {
        this.__collapse = collapse;
        this._changeDetectorRef.markForCheck();
      });
    this._subscription.add(hookSidebarCollapseSubscription);
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  //#endregion

  //#region Methods

  //#endregion
}
