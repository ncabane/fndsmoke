import { test } from '../fixtures';

test('Homepage Smoke Test', async ({ home, common, cookies }) => {

  //#region actual tests
  // If Funda shows an "I'm not a robot" captcha, stop the smoke test early
  if (await cookies.isRobotCheckVisible()) {
    return;
  }
  // Expects the homepage title to be correct
  await home.homepageTitleIsCorrect();
  
  // Expects the funda logo to be present
  await common.fundaLogoIsPresent();
  
  // Expects the main navigation header to be present
  await common.mainNavigationHeaderIsPresent();
  
  // Expects the funda header image to be present
  await home.homepageHasFundaHeaderImage();
  
  // Expects the search bar to be present
  await home.homepageHasSearchBar();
  
  // Expects the search button to be present
  await home.homepageHasSearchButton();
  
  // Expects the search on map link to be present
  await home.homepageHasSearchOnMapLink();
  
  // Expects the content info footer to be present
  await common.contentInfoFooterIsPresent();

  // Expects the main footer to be present
  await common.mainFooterIsPresent();
  
  //#endregion
});
