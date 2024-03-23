import { Observable } from 'rxjs';
import { NavigationExtras, UrlTree } from '@angular/router';

export interface INavigationService {
  //#region Methods

  // Navigate to a specific screen by using screen code asynchronously.
  navigateToScreenAsync(
    screenCode: string,
    routeParams?: { [key: string]: any },
    extras?: NavigationExtras
  ): Observable<boolean>;

  // Build url tree.
  buildUrlTree(
    screenCode: string,
    routeParams: { [key: string]: any }
  ): UrlTree;

  //#endregion
}
