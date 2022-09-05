import {Component, HostBinding, Inject, OnInit} from '@angular/core';
import {LoginViewModel} from '../../view-models/login.view-model';
import {IAuthenticationService} from '../../services/interfaces/authentication-service.interface';
import {LoginResultViewModel} from '../../view-models/login-result-view-model';
import {Router} from '@angular/router';
import {MessageChannelConstant} from '../../constants/message-channel.constant';
import {MessageEventConstant} from '../../constants/message-event.constant';
import {AUTHENTICATION_SERVICE_INJECTION_TOKEN, UI_SERVICE_INJECTION_TOKEN} from '../../constants/injection-token.constant';
import {IMessageBusService, MESSAGE_BUS_SERVICE} from '@message-bus/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'div[account-login]',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

  //#region Properties

  /*
  * Model for 2-way data binding.
  * */
  public model: LoginViewModel;

  /*
  * Class which will be set to component.
  * */
  @HostBinding('class')
  public containerClass = 'container';

  /*
  * Whether component is busy or not.
  * */
  public shouldComponentDisabled: boolean;

  //#endregion

  //#region Constructor

  public constructor(@Inject(AUTHENTICATION_SERVICE_INJECTION_TOKEN) protected authenticationService: IAuthenticationService,
                     @Inject(MESSAGE_BUS_SERVICE) protected messageBusService: IMessageBusService,
                     public router: Router) {
    this.model = new LoginViewModel();

  }

  //#endregion

  //#region Methods

  /*
  * Called when component is initialized.
  * */
  public ngOnInit(): void {
    this.messageBusService
      .addMessage<string>(MessageChannelConstant.ui, MessageEventConstant.updatePageClass, 'bg-gradient-primary');
  }

  /*
  * Callback which is fired when login button is clicked.
  * */
  public clickLogin($event): void {

    // Prevent default behaviour.
    if ($event) {
      $event.preventDefault();
    }

    // Generate a forgery token and set to local storage.
    const authorizationToken = new LoginResultViewModel();
    authorizationToken.code = '12345';
    authorizationToken.expire = new Date().getTime() + 3600000;
    authorizationToken.lifeTime = 3600;
    this.authenticationService.setAuthorization(authorizationToken);

    // Redirect to home.
    this.router.navigate(['/home']);
  }


  //#endregion
}
