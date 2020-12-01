import {INavigationService} from '../interfaces/navigation-service.interface';
import {Injectable} from '@angular/core';
import {from, Observable, throwError} from 'rxjs';
import {NavigationExtras, Router, UrlTree} from '@angular/router';
import {template, templateSettings} from 'lodash';

@Injectable()
export class NavigationService implements INavigationService {

  //#region Properties

  // Mapping between code & url.
  // tslint:disable-next-line:variable-name
  private readonly _codeToUrl: { [code: string]: string };

  //#endregion

  //#region Constructor

  public constructor(protected router: Router) {
  }

  //#endregion

  //#region Methods

  // Navigate to a specific screen code.
  public navigateToScreenAsync(screenCode: string, routeParams: { [key: string]: any },
                               extras?: NavigationExtras): Observable<boolean> {

    // Screen code is not found.
    if (!this._codeToUrl || !this._codeToUrl[screenCode]) {
      return throwError('SCREEN_CODE_NOT_FOUND');
    }

    templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    const compiled = template(this._codeToUrl[screenCode]);
    const fullUrl = compiled(routeParams);
    return from(this.router.navigate([fullUrl], extras));
  }

  // Build url tree.
  public buildUrlTree(screenCode: string, routeParams: { [key: string]: any }): UrlTree {

    // Code to url mapping is invalid.
    if (!this._codeToUrl) {
      return null;
    }

    // Screen code is not found.
    if (!this._codeToUrl || !this._codeToUrl[screenCode]) {
      throw new Error('SCREEN_CODE_NOT_FOUND');
    }

    templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    const compiled = template(this._codeToUrl[screenCode]);
    const fullUrl = compiled(routeParams);
    return this.router.createUrlTree([fullUrl]);
  }

  //#endregion


}
