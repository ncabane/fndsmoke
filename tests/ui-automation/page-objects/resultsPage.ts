import { Page, expect, Locator} from '@playwright/test';

// [Nicolas] Locators and test flow.
// [AI-assisted] resultsPageHeaderIsCorrect timeout; resultsPageClickFirstPropertyLink wait+scroll+click

//#region Page Objects
export class ResultsPage {
  resultsPageHeader: Locator;
  resultsPageFirstPropertyLink: Locator;

  constructor(private readonly page: Page) {
    this.resultsPageHeader = this.page.getByTestId('pageHeader');
    // Brittle: XPath depends on exact DOM structure; prefer data-testid or role if the app adds one
    this.resultsPageFirstPropertyLink = this.page.locator('//*[@id="PageListings"]/div[5]/div[2]/section/div/div[1]/a[1]/div');
  }
  //#endregion

  //#region Actions

  // Expects the results page header to be correct
  async resultsPageHeaderIsCorrect() {
    await expect(this.resultsPageHeader).toBeVisible({ timeout: 10000 });
    await expect(this.resultsPageHeader).toContainText('koopwoningen');
  }

  async resultsPageClickFirstPropertyLink() {
   
    // Waits for the page to load
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.resultsPageFirstPropertyLink).toBeVisible({ timeout: 10000 });
    console.log('First property link is visible and clicked');
    await this.resultsPageFirstPropertyLink.click();
  }
  //#endregion
}