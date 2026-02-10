import { test } from '@playwright/test';
import { CommonPage } from '../pages/commonPage';
import { HomePage } from '../pages/HomePage';
import { CookiesPage } from '../pages/cookiesPage';
import { ResultsPage } from '../pages/resultsPage';
import { PropertyPage } from '../pages/propertyPage';

test('See Property Page Smoke Test', async ({ page }) => {
  const common = new CommonPage(page);
  const home = new HomePage(page);
  const cookies = new CookiesPage(page);
  const results = new ResultsPage(page);
  const property = new PropertyPage(page);
 
  //#region actual tests
  await home.goto();
  await common.verifyUserAgent();
  await cookies.cookiesClickAcceptButton();

  // If Funda shows an "I'm not a robot" captcha, stop the smoke test early
  if (await cookies.isRobotCheckVisible()) {
    return;
  }
  // Clicks the search button
  await home.homepageSearchClickSearchButton();

  // Expects the results page header to be correct
  await results.resultsPageHeaderIsCorrect();
 
  // Clicks the first property link on the results page
  await results.resultsPageClickFirstPropertyLink();
 
  // Expects the property breadcrumb to be correct
  await common.breadCrumbsAreVisible();
 
  // Expects the property photos container to be visible
  await property.propertyPhotosIsVisible();  

  // Expects the property about section to be visible
  await property.propertyAboutIsVisible();  
 
  //#endregion
});
