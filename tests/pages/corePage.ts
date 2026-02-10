import { Page, expect, Locator} from '@playwright/test';

// [Nicolas] Locators and test flow.
// [AI-assisted] Visibility refactored to scrollIntoViewIfNeeded() + expect().toBeVisible({ timeout }).

//#region Page Objects
export class CorePage {
  corePageSellYourHouseTitle: Locator;

  constructor(private readonly page: Page) {
    this.corePageSellYourHouseTitle = this.page.getByText('Verkoop je huis op Funda via een makelaar');

  }
  //#endregion

  //#region Actions

  // Checking if one of the core page titles is visible to assert that the core page is loaded. 
  // Only one assertion for this assignment; more can be added if needed.
  async corePageSellYourHouseTitleIsVisible() {
    await this.corePageSellYourHouseTitle.scrollIntoViewIfNeeded();
    await expect(this.corePageSellYourHouseTitle).toBeVisible({ timeout: 10000 });
    console.log('Sell your house title is visible');
  }

  //#endregion
}
