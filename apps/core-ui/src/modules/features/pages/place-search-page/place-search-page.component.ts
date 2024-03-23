import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KeyValue } from '@angular/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'place-search-demo',
  templateUrl: 'place-search-page.component.html',
  styleUrls: ['place-search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceSearchPageComponent {
  //#region Properties

  private readonly _feedbackOptions: KeyValue<string, boolean | null>[];

  private readonly _sortOptions: KeyValue<string, string>[];

  //#endregion

  //#region Accessors

  public get feedbackOptions(): KeyValue<string, boolean | null>[] {
    return this._feedbackOptions;
  }

  public get sortOptions(): KeyValue<string, string>[] {
    return this._sortOptions;
  }

  //#endregion

  //#region Constructor

  public constructor() {
    this._feedbackOptions = [
      {
        key: 'PLACE_SEARCH_PAGE.FEEDBACK_OPTIONS.YES',
        value: true,
      },
      {
        key: 'PLACE_SEARCH_PAGE.FEEDBACK_OPTIONS.NO',
        value: false,
      },
      {
        key: '',
        value: null,
      },
    ];

    this._sortOptions = [
      {
        key: 'PLACE_SEARCH_PAGE.SORT_OPTIONS.RELEVANCE',
        value: 'relevance',
      },
      {
        key: 'PLACE_SEARCH_PAGE.SORT_OPTIONS.DISTANCE',
        value: 'distance',
      },
    ];
  }

  //#endregion

  //#region Methods

  //#endregion
}
