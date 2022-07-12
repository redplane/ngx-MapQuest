import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {IMessageBusService, MESSAGE_BUS_SERVICE} from '@message-bus/core';
import {SidebarCollapseChangedMessage} from '../../../models/messages/sidebar-collapse-changed.message';
import {Subscription} from 'rxjs';
import {COMPONENTS_PAGE_SERVICE} from '../../../constants/injectors';
import {IComponentsPageService} from '../../../services/interfaces/components-page-service.interface';
import {ComponentViewModel} from '../../../view-models/examples/component.view-model';

@Component({
  selector: 'components-page',
  templateUrl: 'components-page.component.html',
  styleUrls: ['components-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsPageComponent implements OnInit, OnDestroy {

  //#region Properties

  private __hasSidebarCollapsed = false;

  private __components: ComponentViewModel[];

  protected readonly _subscription = new Subscription();

  //#endregion

  //#region Accessors

  public get sidebarCollapsed(): boolean {
    return this.__hasSidebarCollapsed;
  }

  public get components(): ComponentViewModel[] {
    return this.__components;
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(MESSAGE_BUS_SERVICE)
                     protected readonly _messageBusService: IMessageBusService,
                     @Inject(COMPONENTS_PAGE_SERVICE)
                     protected readonly _examplesPageService: IComponentsPageService,
                     protected readonly _changeDetectorRef: ChangeDetectorRef) {
  }

  //#endregion

  //#region Life cycle hooks

  public ngOnInit(): void {

    const getExamplesSubscription = this._examplesPageService.getComponentsAsync()
      .subscribe(components => {
        this.__components = components;
        this._changeDetectorRef.markForCheck();
      });
    this._subscription.add(getExamplesSubscription);

    const hookSidebarCollapseChangedSubscription = this._messageBusService
      .hookTypedMessageChannel<boolean>(new SidebarCollapseChangedMessage())
      .subscribe(collapse => {
        this.__hasSidebarCollapsed = collapse;
        this._changeDetectorRef.markForCheck();
      });
    this._subscription.add(hookSidebarCollapseChangedSubscription);

  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  //#endregion
}
