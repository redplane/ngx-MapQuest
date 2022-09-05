import {ChangeDetectorRef, Component, ElementRef, HostBinding, Inject, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MessageChannelConstant} from '../constants/message-channel.constant';
import {MessageEventConstant} from '../constants/message-event.constant';
import {TranslateService} from '@ngx-translate/core';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'app';

  //#region Properties

  /*
  * Subscription about page body update.
  * */
  private _hookPageBodyUpdateEventSubscription: Subscription;

  /*
  * Catch sidebar display message subscription.
  * */
  private _hookSideBarDisplayMessageSubscription: Subscription;

  /*
  * Base host class.
  * */
  private _hostClass: string;

  /*
  * Should sidebar be hidden or not.
  * */
  private _shouldSideBarHidden = true;

  //#endregion

  //#region Constructor

  public constructor(protected router: Router,
                     protected translateService: TranslateService,
                     protected elementRef: ElementRef) {
    this.translateService.use('en-US');
  }

  //#endregion

  //#region Methods

  /*
  * Called when component is being initiated.
  * */
  public ngOnInit(): void {

    // TODO: Implement side bar menu.
    // // Hook to update page class event in ui channel.
    // this._hookPageBodyUpdateEventSubscription = this.messageBusService
    //   .hookMessageChannel(MessageChannelConstant.ui, MessageEventConstant.updatePageClass)
    //   .subscribe((updatedClass: string) => {
    //
    //     if (!updatedClass) {
    //       return;
    //     }
    //
    //     // Initialize output class.
    //     let outputHostClass = this._hostClass;
    //     if (!outputHostClass) {
    //       outputHostClass = updatedClass;
    //     }
    //
    //     if (this._shouldSideBarHidden) {
    //       outputHostClass += ' sidebar-toggled';
    //     }
    //
    //     this.elementRef.nativeElement.class = outputHostClass;
    //   });
    //
    // // Listen to sidebar toggle event in ui channel.
    // this._hookSideBarDisplayMessageSubscription = this.messageBusService
    //   .hookMessageChannel(MessageChannelConstant.ui, MessageEventConstant.displaySidebar)
    //   .subscribe(shouldSideBarVisible => {
    //     this._shouldSideBarHidden = !shouldSideBarVisible;
    //   });
  }

  /*
  * Called when component is destroyed.
  * */
  public ngOnDestroy(): void {

    // Unsubscribe created subscription to prevent memory leaks.
    if (this._hookPageBodyUpdateEventSubscription && !this._hookPageBodyUpdateEventSubscription.closed) {
      this._hookPageBodyUpdateEventSubscription.unsubscribe();
    }

    if (this._hookSideBarDisplayMessageSubscription && !this._hookSideBarDisplayMessageSubscription.closed) {
      this._hookSideBarDisplayMessageSubscription.unsubscribe();
    }
  }


  //#endregion
}
