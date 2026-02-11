import { test as base } from '@playwright/test';
import { HomePage } from './page-objects/homePage';
import { CommonPage } from './page-objects/commonPage';
import { CookiesPage } from './page-objects/cookiesPage';
import { ResultsPage } from './page-objects/resultsPage';
import { PropertyPage } from './page-objects/propertyPage';

// [Nicolas] Idea to centralise shared UI setup into fixtures.
// [AI-assisted] Fixture implementation and typing based on Playwright docs.
// Shared UI fixtures: page objects and common homepage setup.
type UIFixtures = {
  home: HomePage;
  common: CommonPage;
  cookies: CookiesPage;
  results: ResultsPage;
  property: PropertyPage;
};

export const test = base.extend<UIFixtures>({
  common: async ({ page }, use) => {
    await use(new CommonPage(page));
  },

  cookies: async ({ page }, use) => {
    await use(new CookiesPage(page));
  },

  results: async ({ page }, use) => {
    await use(new ResultsPage(page));
  },

  property: async ({ page }, use) => {
    await use(new PropertyPage(page));
  },

  home: async ({ page, common, cookies }, use) => {
    const home = new HomePage(page);

    // Common homepage setup shared across smoke tests.
    await home.goto();
    await common.verifyUserAgent();
    await cookies.cookiesClickAcceptButton();

    await use(home);
  },
});

export { expect } from '@playwright/test';

