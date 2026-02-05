import { Page, expect, Locator} from '@playwright/test';

//#region Page Objects
export class CookiesPage {
  cookiesAcceptButton: Locator;

  constructor(private readonly page: Page) {
    this.cookiesAcceptButton = this.page.getByLabel('Alles accepteren');
  }
  //#endregion

  //#region Actions
  async cookiesClickAcceptButton() {
    const visible = await this.cookiesAcceptButton.isVisible();
    if (visible) {
      console.log('Cookies accept button is visible and clicked on it');
      await this.cookiesAcceptButton.click();
    } else {
      console.log('Cookies accept button is not visible, test continues');
    }
  }

  async isRobotCheckVisible(): Promise<boolean> {
    const robotText = this.page.getByText(/ik ben geen robot|i am not a robot/i);
    const visible = await robotText.isVisible();
    if (visible) {
      console.log('Robot check detected, stopping homepage smoke assertions.');
    }
    return visible;
  }
  //#endregion
}