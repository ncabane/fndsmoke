import { test } from '@playwright/test';
import { CommonPage } from './pages/commonPage';
import { HomePage } from './pages/HomePage';
import { CookiesPage } from './pages/cookiesPage';

test('Homepage Smoke Test', async ({ page }) => {
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
  await home.homepageTitleIsCorrect();
  await common.fundaLogoIsPresent();
  await common.mainNavigationHeaderIsPresent();
  await home.homepageHasFundaHeaderImage();
  await home.homepageHasSearchBar();
  await home.homepageHasSearchButton();
  await home.homepageHasSearchOnMapLink();
  await common.contentInfoFooterIsPresent();
  await common.mainFooterIsPresent();
  //#endregion
});
