import { test, expect } from '@playwright/test';
import { SearchApi } from '../pages/api/SearchApi';

test('Search API – status, JSON, friendlyUrl, listings, key fields', async ({
  request,
}) => {
  const searchApi = new SearchApi(request);
  const body = searchApi.getDefaultSearchBody();
  const response = await searchApi.search(body);

  // 1. Status code is 200
  expect(response.status()).toBe(200);

  // 2. Response body is valid JSON
  const json = await response.json();
  expect(json).toBeDefined();
  expect(typeof json).toBe('object');

  // Log the response so you can see the result of the query in the terminal
  console.log('Search API response:', JSON.stringify(json, null, 2));

  // 3. friendlyUrl exists and contains city
  expect(json).toHaveProperty('friendlyUrl');
  expect(json.friendlyUrl.toLowerCase()).toContain('diemen');

  // 4. Listings array exists and is not empty
  expect(json).toHaveProperty('listings');
  expect(Array.isArray(json.listings)).toBe(true);
  expect(json.listings.length).toBeGreaterThan(0);

  // 5. First listing contains key fields
  const listing = json.listings[0];
  expect(listing).toHaveProperty('price');
  expect(listing).toHaveProperty('listingUrl');
  expect(listing).toHaveProperty('address');
  expect(listing.address).toHaveProperty('city');
});
