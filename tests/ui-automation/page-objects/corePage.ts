import { Page, expect, Locator} from '@playwright/test';

// [Nicolas] Locators and test flow.
// [AI-assisted] Visibility refactored to scrollIntoViewIfNeeded() + expect().toBeVisible({ timeout }).

//#region Page Objects
export class CorePage {
  corePageSellYourHouseTitle: Locator;

  constructor(private readonly page: Page) {
    this.corePageSellYourHouseTitle = this.page.getByRole('link', { name: 'Verkoop je huis op Funda' })

  }
  //#endregion

  //#region Actions

  // Checking if one of the core page titles is visible to assert that the core page is loaded. 
  // Only one assertion for this assignment; more can be added if needed.
  async corePageVerkoopJeHuisHeadingTitleIsVisible() {
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.corePageSellYourHouseTitle).toBeVisible({ timeout: 10000 });
    console.log('Sell your house title is visible');
  }

  //#endregion
}
