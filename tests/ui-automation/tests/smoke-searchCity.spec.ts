import { test } from '../fixtures';

test('Search City Smoke Test', async ({ common, home, cookies, results }) => {
  //#region actual tests
  // If Funda shows an "I'm not a robot" captcha, stop the smoke test early
  if (await cookies.isRobotCheckVisible()) {
    return;
  }
  // Clicks the search button
  await home.homepageSearchClickSearchButton();

  // Expects the results page header to be correct
  await results.resultsPageHeaderIsCorrect();
  
  //#endregion
});
