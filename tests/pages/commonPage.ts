import { Page, expect, Locator} from '@playwright/test';

//#region Page Objects
export class CommonPage {
  fundaLogo: Locator;
  mainNavigationHeader: Locator
  contentInfoFooter: Locator
  mainFooter: Locator

  
  constructor(private readonly page: Page)
   {
    this.fundaLogo = this.page.getByAltText('Funda Logo');
    this.mainNavigationHeader = this.page.getByLabel('Main');
    this.contentInfoFooter = this.page.getByRole('contentinfo');
    this.mainFooter = this.page.locator('//*[@id="__nuxt"]/div/div[2]/footer/div[2]');
  }
//#endregion

//#region Actions

  async fundaLogoIsPresent() {
    const visible = await this.fundaLogo.isVisible();
    if (await this.fundaLogo.isVisible()) {
      console.log('Funda logo is visible');
    } else {
      console.log('Funda logo is not visible');
    }
    expect(visible).toBe(true);
  }

  async mainNavigationHeaderIsPresent() {
    const visible = await this.mainNavigationHeader.isVisible();
    if (await this.mainNavigationHeader.isVisible()) {
      console.log('Main navigation header is visible');
    } else {
      console.log('Main navigation header is not visible');
    }
    expect(visible).toBe(true);
  }

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
  async contentInfoFooterIsPresent() {
    const visible = await this.contentInfoFooter.isVisible();
    if (await this.contentInfoFooter.isVisible()) {
      console.log('Content info footer is visible');
    } else {
      console.log('Content info footer is not visible');
    }
    expect(visible).toBe(true);
  }
  async mainFooterIsPresent() {
    const visible = await this.mainFooter.isVisible();
    if (await this.mainFooter.isVisible()) {
      console.log('Main footer is visible');
    } else {
      console.log('Main footer is not visible');
    }
    expect(visible).toBe(true);
  }
  //#endregion
}
