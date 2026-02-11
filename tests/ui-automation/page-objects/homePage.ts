import { Page, expect, Locator } from '@playwright/test';
import { urls } from '../../../config/urls';

// [Nicolas] Page structure, locators, test flow.
// [AI-assisted] File recreated after loss; visibility methods use expect().toBeVisible({ timeout }) + console.log.

//#region Page Objects
export class HomePage {
  homepageSearchBar: Locator;
  homepageSearchButton: Locator;
  homepageSearchOnMapLink: Locator;
  homepageFundaHeaderImage: Locator;

  constructor(private readonly page: Page) {
    this.homepageSearchBar = this.page.getByTestId('search-box');
    this.homepageSearchButton = this.page.getByLabel('SearchBox submit button');
    this.homepageSearchOnMapLink = this.page.getByLabel('Zoek op kaart');
    this.homepageFundaHeaderImage = this.page.locator('img[src*="funda_header.svg"]');
  }
  //#endregion

  //#region Actions

  // Goes to the home page
  async goto() {
    await this.page.goto(urls.home);
  }

  // Expects the homepage title to be correct
  async homepageTitleIsCorrect() {
    await expect(this.page).toHaveTitle(/Funda/i);
  }

  // Expects the funda header image to be visible
  async homepageHasFundaHeaderImage() {
    await expect(this.homepageFundaHeaderImage).toBeVisible({ timeout: 10000 });
    console.log('Funda header image is visible');
  }

  // Expects the search bar to be visible
  async homepageHasSearchBar() {
    await expect(this.homepageSearchBar).toBeVisible({ timeout: 10000 });
    console.log('Search bar is visible');
  }

  // Expects the search button to be visible
  async homepageHasSearchButton() {
    await expect(this.homepageSearchButton).toBeVisible({ timeout: 10000 });
    console.log('Search button is visible');
  }

  // Expects the search on map link to be visible
  async homepageHasSearchOnMapLink() {
    await expect(this.homepageSearchOnMapLink).toBeVisible({ timeout: 10000 });
    console.log('Search on map link is visible');
  }

  // Clicks the search button
  async homepageSearchClickSearchButton() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.homepageSearchButton.click();
  }
  //#endregion
}
