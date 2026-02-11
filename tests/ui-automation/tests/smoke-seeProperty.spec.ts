import { test } from '../fixtures';

test('See Property Page Smoke Test', async ({ common, home, cookies, results, property }) => {
 
  //#region actual tests
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
