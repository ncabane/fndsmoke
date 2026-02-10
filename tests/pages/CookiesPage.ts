import { Page, expect, Locator} from '@playwright/test';

// [Nicolas] Locators and overall design.
// [AI-assisted] cookiesClickAcceptButton: try/expect+click with timeout; isRobotCheckVisible: 2s wait instead of one-off isVisible().

//#region Page Objects
export class CookiesPage {
  cookiesAcceptButton: Locator;

  constructor(private readonly page: Page) {
    this.cookiesAcceptButton = this.page.getByLabel('Alles accepteren');
  }
  //#endregion

  //#region Actions

  // Clicks the cookies accept button
  async cookiesClickAcceptButton() {
    // Tries to click the cookies accept button
    try {
      await expect(this.cookiesAcceptButton).toBeVisible({ timeout: 5000 });
      await this.cookiesAcceptButton.click();
      console.log('Cookies accept button is visible and clicked');
    } catch {
      // Cookie banner not shown or already dismissed; test continues
      console.log('Cookies accept button not visible, test continues');
    }
  }

  // Checks if the robot check is visible
  async isRobotCheckVisible(): Promise<boolean> {
    const robotText = this.page.getByText(/ik ben geen robot|i am not a robot/i);
    
    // Tries to check if the robot check is visible
    try {
      await expect(robotText).toBeVisible({ timeout: 2000 });
      console.log('Robot check detected, stopping homepage smoke assertions.');
      return true;
    } catch {
      // Robot check not visible, test continues
      return false;
    }
  }
  //#endregion
}