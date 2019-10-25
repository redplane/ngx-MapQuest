import {Component, HostBinding, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileViewModel} from '../../../view-models/profile.view-model';
import {filter, switchMap} from 'rxjs/operators';
import {MessageChannelConstant} from '../../../constants/message-channel.constant';
import {MessageEventConstant} from '../../../constants/message-event.constant';
import {Subscription} from 'rxjs';
import {INgRxMessageBusService, MESSAGE_BUS_SERVICE_INJECTOR} from 'ngrx-message-bus';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'div[authenticated-layout]',
  templateUrl: 'authenticated-layout.component.html'
})

export class AuthenticatedLayoutComponent implements OnInit {

  //#region Properties

  /*
  * Profile information.
  * */
  public profile: ProfileViewModel;

  @HostBinding('id')
  public readonly hostId = 'wrapper';

  //#endregion

  //#region Constructor

  /*
  * Initiate component with injectors.
  * */
  public constructor(protected activatedRoute: ActivatedRoute,
                     @Inject(MESSAGE_BUS_SERVICE_INJECTOR) protected messageBusService: INgRxMessageBusService) {


  }

  //#endregion

  //#region Methods

  /*
  * Event which is called when component has been initiated.
  * */
  public ngOnInit(): void {
    this.activatedRoute.data.subscribe((x: any) => {
      this.profile = <ProfileViewModel>x.profile;
    });
  }

  //#endregion
}
