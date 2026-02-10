import { Page, expect, Locator} from '@playwright/test';

// [Nicolas] Page structure, locators, test flow.
// [AI-assisted] Visibility methods refactored to expect().toBeVisible({ timeout }) + scrollIntoViewIfNeeded() for stability; console.log kept for assignment.

//#region Page Objects
export class CommonPage {
  fundaLogo: Locator;
  mainNavigationHeader: Locator;
  contentInfoFooter: Locator;
  mainFooter: Locator;
  mainFooterVerkoopJeHuisLink: Locator;
  mainFooterMeldJeAanLink: Locator;
  mainFooterInloggenLink: Locator;
  mainFooterOverFundaLink: Locator;
  breadCrumbs: Locator;

  
  constructor(private readonly page: Page)
   {
    this.fundaLogo = this.page.getByAltText('Funda Logo');
    this.mainNavigationHeader = this.page.getByLabel('Main');
    this.contentInfoFooter = this.page.getByRole('contentinfo');
    this.mainFooter = this.page.locator('//*[@id="__nuxt"]/div/div[2]/footer/div[2]');
    this.mainFooterVerkoopJeHuisLink = this.page.getByLabel('Verkoop je huis op Funda');
    this.mainFooterMeldJeAanLink = this.page.getByLabel('Meld je aan bij Funda');
    this.mainFooterInloggenLink = this.page.getByLabel('Inloggen Mijn Huis');
    this.mainFooterOverFundaLink = this.page.getByLabel('Over Funda');
    this.breadCrumbs = this.page.getByLabel('Breadcrumb');
  }
//#endregion

//#region Actions

  // Expects the Funda logo to be present
  async fundaLogoIsPresent() {
    await expect(this.fundaLogo).toBeVisible({ timeout: 10000 });
    console.log('Funda logo is visible');
  }

  // Expects the main navigation header to be present
  async mainNavigationHeaderIsPresent() {
    await expect(this.mainNavigationHeader).toBeVisible({ timeout: 10000 });
    console.log('Main navigation header is visible');
  }

  // Verifies the browser is using the Funda interview user agent
  async verifyUserAgent() {
    // Verify the browser is actually using the special Funda interview user agent
    const ua = await this.page.evaluate(() => navigator.userAgent);
    const expectedUA = process.env.FUNDA_USER_AGENT;
    if (expectedUA) {
      await expect(ua).toBe(expectedUA);
      // Do not log the actual UA to avoid exposing the secret in terminal output
      console.log('UA in browser: [Funda interview UA configured]');
    } else {
      console.log('UA in browser:', ua);
    }
  }

  // Expects the content info footer to be present
  async contentInfoFooterIsPresent() {
    await this.contentInfoFooter.scrollIntoViewIfNeeded();
    await expect(this.contentInfoFooter).toBeVisible({ timeout: 10000 });
    console.log('Content info footer is visible');
  }

  // Expects the main footer to be present
  async mainFooterIsPresent() {
    await this.mainFooter.scrollIntoViewIfNeeded();
    await expect(this.mainFooter).toBeVisible({ timeout: 10000 });
    console.log('Main footer is visible');
  }

  // Expects the Verkoop je huis link to be present
  async mainFooterVerkoopJeHuisLinkPresent() {
    await this.mainFooterVerkoopJeHuisLink.scrollIntoViewIfNeeded();
    await expect(this.mainFooterVerkoopJeHuisLink).toBeVisible({ timeout: 10000 });
    console.log('Verkoop je huis link is visible');
  }

  // Expects the Meld je aan link to be present
  async mainFooterMeldJeAanLinkIsPresent() {
    await this.mainFooterMeldJeAanLink.scrollIntoViewIfNeeded();
    await expect(this.mainFooterMeldJeAanLink).toBeVisible({ timeout: 10000 });
    console.log('Meld je aan link is visible');
  }

  // Expects the Inloggen link to be present
  async mainFooterInloggenLinkIsPresent() {
    await this.mainFooterInloggenLink.scrollIntoViewIfNeeded();
    await expect(this.mainFooterInloggenLink).toBeVisible({ timeout: 10000 });
    console.log('Inloggen link is visible');
  }

  // Expects the Over Funda link to be present
  async mainFooterOverFundaLinkIsPresent() {
    await this.mainFooterOverFundaLink.scrollIntoViewIfNeeded();
    await expect(this.mainFooterOverFundaLink).toBeVisible({ timeout: 10000 });
    console.log('Over Funda link is visible');
  }

  // Expects the breadcrumbs to be visible
  async breadCrumbsAreVisible() {
    await expect(this.breadCrumbs).toBeVisible({ timeout: 10000 });
    console.log('Breadcrumbs are visible');
  }
  //#endregion
}
