import { test } from '@playwright/test';
import { CommonPage } from '../pages/commonPage';
import { HomePage } from '../pages/HomePage';
import { CookiesPage } from '../pages/cookiesPage';

test('Navigation Core Pages Smoke Test', async ({ page }) => {
  const common = new CommonPage(page);
  const home = new HomePage(page);
  const cookies = new CookiesPage(page);

  //#region actual tests
  await home.goto();
  await common.verifyUserAgent();
  await cookies.cookiesClickAcceptButton();

  // If Funda shows an "I'm not a robot" captcha, stop the smoke test early
  if (await cookies.isRobotCheckVisible()) {
    return;
  } 

  // Expects the main footer to be present
  await common.mainFooterIsPresent();
  
  // Expects the Verkoop je huis link to be present
  await common.mainFooterVerkoopJeHuisLinkPresent();
  
  // Expects the Meld je aan link to be present
  await common.mainFooterMeldJeAanLinkIsPresent();
 
  // Expects the Inloggen link to be present
  await common.mainFooterInloggenLinkIsPresent();
  
  // Expects the Over Funda link to be present
  await common.mainFooterOverFundaLinkIsPresent();

  //#endregion
});
