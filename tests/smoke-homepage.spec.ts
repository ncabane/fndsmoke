import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { CookiesPage } from './pages/CookiesPage';

test('Homepage Smoke Test', async ({ page }) => {
  const home = new HomePage(page);
  const cookies = new CookiesPage(page);

  await home.goto();

  // Verify the browser is actually using the special Funda interview user agent
  const ua = await page.evaluate(() => navigator.userAgent);
  console.log('UA in browser:', ua);
  const expectedUA = process.env.FUNDA_USER_AGENT;
  if (expectedUA) {
    await expect(ua).toBe(expectedUA);
  }

  await cookies.cookiesClickAcceptButton();

  // If Funda shows an "I'm not a robot" captcha, stop the smoke test early
  if (await cookies.isRobotCheckVisible()) {
    return;
  }

  await home.homepageTitleIsCorrect();
  await home.homepageHasFundaLogo();
  await home.homepageHasFundaHeaderImage();
  await home.homepageHasSearchBar();
  await home.homepageHasSearchButton();
  await home.homepageHasSearchOnMapLink();
});
