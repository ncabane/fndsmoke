import { test as base, expect } from '@playwright/test';
import { SearchApi } from './page-objects/SearchApi';

// [Nicolas] Idea to expose the Search API client as a fixture.
// [AI-assisted] Fixture wiring using Playwright's APIRequestContext.
type ApiFixtures = {
  searchApi: SearchApi;
};

export const test = base.extend<ApiFixtures>({
  searchApi: async ({ request }, use) => {
    const api = new SearchApi(request);
    await use(api);
  },
});

export { expect };

