import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {CONTENT_PAGE_SERVICE} from '../../../constants/injectors';
import {IContentPageService} from '../../../services/interfaces/content-page-service.interface';
import {map, Subscription} from 'rxjs';
import {ContentSectionViewModel} from '../../../view-models/content-pages/content-section.view-model';
import {IMessageBusService, MESSAGE_BUS_SERVICE} from '@message-bus/core';
import {SidebarCollapseChangedMessage} from '../../../models/messages/sidebar-collapse-changed.message';

@Component({
  selector: 'content-pages',
  templateUrl: 'content-page.component.html',
  styleUrls: ['content-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentPageComponent implements OnInit, OnDestroy {

  //#region Properties

  private __title = '';

  private __sections: ContentSectionViewModel[] = [];

  private __sidebarCollapsed = false;

  protected _subscription = new Subscription();

  //#endregion

  //#region Accessors

  public get title(): string {
    return this.__title;
  }

  public get sections(): ContentSectionViewModel[] {
    return this.__sections;
  }

  public get sidebarCollapsed(): boolean {
    return this.__sidebarCollapsed;
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(CONTENT_PAGE_SERVICE)
                     protected readonly _contentPageService: IContentPageService,
                     @Inject(MESSAGE_BUS_SERVICE)
                     protected readonly _messageBusService: IMessageBusService,
                     protected readonly _changeDetectorRef: ChangeDetectorRef) {
  }

  //#endregion

  //#region Life cycle hooks

  public ngOnInit(): void {

    // Get page title
    const getTitleSubscription = this._contentPageService.getTitleAsync()
      .pipe(
        map(contentTitle => contentTitle.title)
      )
      .subscribe(title => {
        this.__title = title;
        this._changeDetectorRef.markForCheck();
      });
    this._subscription.add(getTitleSubscription);

    // Get page sections
    const getPageSectionsSubscription = this._contentPageService.getSectionsAsync()
      .subscribe(sections => {
        this.__sections = sections || [];
        this._changeDetectorRef.markForCheck();
      });
    this._subscription.add(getPageSectionsSubscription);

    const hookSidebarCollapseChangedSubscription = this._messageBusService
      .hookTypedMessageChannel<boolean>(new SidebarCollapseChangedMessage())
      .subscribe(collapsed => {
        this.__sidebarCollapsed = collapsed;
        this._changeDetectorRef.markForCheck();
      });
    this._subscription.add(hookSidebarCollapseChangedSubscription);
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  //#endregion

}
