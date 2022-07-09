import {ChangeDetectionStrategy, Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileViewModel} from '../../../view-models/profile.view-model';

@Component({
  selector: 'div[authenticated-layout]',
  templateUrl: 'main-layout.component.html',
  styleUrls: ['main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainLayoutComponent implements OnInit {

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
  public constructor(protected activatedRoute: ActivatedRoute) {


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
