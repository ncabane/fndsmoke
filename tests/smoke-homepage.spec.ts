import { test } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test('Homepage Smoke Test', async ({ page }) => {
  const home = new HomePage(page);

  await home.goto();
  await home.homepageTitleIsCorrect();
  await home.homepageHasFundaLogo();
});

