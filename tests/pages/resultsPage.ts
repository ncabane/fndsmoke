import { Page, expect, Locator} from '@playwright/test';

//#region Page Objects
export class ResultsPage {
  resultsPageHeader: Locator;

  constructor(private readonly page: Page) {
    // Header section of the search results page
    this.resultsPageHeader = this.page.getByTestId('pageHeader');
  }
  //#endregion

  //#region Actions

  async resultsPageHeaderIsCorrect() {
    // Assert that the header is visible and contains the word "koopwoningen"
    await expect(this.resultsPageHeader).toBeVisible();
    await expect(this.resultsPageHeader).toContainText('koopwoningen');
  }
  
  //#endregion
}