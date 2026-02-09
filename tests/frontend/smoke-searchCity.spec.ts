import { test } from '@playwright/test';
import { CommonPage } from '../pages/commonPage';
import { HomePage } from '../pages/HomePage';
import { CookiesPage } from '../pages/cookiesPage';
import { ResultsPage } from '../pages/resultsPage';

test('Search City Smoke Test', async ({ page }) => {
  const common = new CommonPage(page);
  const home = new HomePage(page);
  const cookies = new CookiesPage(page);
  const resultsPage = new ResultsPage(page);
  //#region actual tests
  await home.goto();
  await common.verifyUserAgent();
  await cookies.cookiesClickAcceptButton();

  // If Funda shows an "I'm not a robot" captcha, stop the smoke test early
  if (await cookies.isRobotCheckVisible()) {
    return;
  }
  // Clickes the search button
  await home.homepageSearchClickSearchButton();

  // Expects the results page header to be correct
  await resultsPage.resultsPageHeaderIsCorrect();
  //#endregion
});
