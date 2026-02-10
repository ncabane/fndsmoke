import { Page, expect, Locator} from '@playwright/test';

//#region Page Objects
export class ResultsPage {
  resultsPageHeader: Locator;
  resultsPageFirstPropertyLink: Locator;

  constructor(private readonly page: Page) {
    // Header section of the search results page
    this.resultsPageHeader = this.page.getByTestId('pageHeader');
    this.resultsPageFirstPropertyLink = this.page.locator('//*[@id="PageListings"]/div[5]/div[2]/section/div/div[1]/a[1]/div');
  }
  //#endregion

  //#region Actions

  async resultsPageHeaderIsCorrect() {
    // Assert that the header is visible and contains the word "koopwoningen"
    await expect(this.resultsPageHeader).toBeVisible();
    await expect(this.resultsPageHeader).toContainText('koopwoningen');
  }

  async resultsPageClickFirstPropertyLink() {
    // Ensure the results page has finished its initial load
    await this.page.waitForLoadState('domcontentloaded');

    // Bring the first property card into view and wait until it is truly visible
    await expect(this.resultsPageFirstPropertyLink).toBeVisible({ timeout: 10000 });

    console.log('First property link is visible and clicked on it');
    await this.resultsPageFirstPropertyLink.click();
  }
  //#endregion
}