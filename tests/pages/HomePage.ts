import { Page, expect, Locator} from '@playwright/test';
import { urls } from '../config/urls';

//#region Page Objects
export class HomePage {
  fundaLogo: Locator;
  searchBar: Locator;
  searchButton: Locator;
  searchOnMapLink: Locator;
  fundaHeaderImage: Locator;
  constructor(private readonly page: Page)
   {
    this.fundaLogo = this.page.getByAltText('Funda Logo');
    this.searchBar = this.page.getByTestId('search-box')
    this.searchButton = this.page.getByLabel('SearchBox submit button');
    this.searchOnMapLink = this.page.getByLabel('Zoek op kaart');
    this.fundaHeaderImage = this.page.locator('img[src*="funda_header.svg"]');
  }
//#endregion

//#region Actions
  async goto() {
    await this.page.goto(urls.home);
  }

  async homepageTitleIsCorrect() {
    await expect(this.page).toHaveTitle(/Funda/i);
  }

  async homepageHasFundaLogo() {
    const visible = await this.fundaLogo.isVisible();
    if (visible) {
      console.log('Funda logo is visible');
    } else {
      console.log('Funda logo is not visible');
    }
    expect(visible).toBe(true);
  }

  async homepageHasFundaHeaderImage() {
    const visible = await this.fundaHeaderImage.isVisible();
    if (visible) {
      console.log('Funda header image is visible');
    } else {
      console.log('Funda header image is not visible');
    }
    expect(visible).toBe(true);
  }

  async homepageHasSearchBar() {
    const visible = await this.searchBar.isVisible();
    if (visible) {
      console.log('Search bar is visible');
    } else {
      console.log('Search bar is not visible');
    }
    expect(visible).toBe(true);
  }

  async homepageHasSearchButton() {
    const visible = await this.searchButton.isVisible();
    if (visible) {
      console.log('Search button is visible');
    } else {
      console.log('Search button is not visible');
    }
    expect(visible).toBe(true);
  }

  async homepageHasSearchOnMapLink() {
    const visible = await this.searchOnMapLink.isVisible();
    if (visible) {
      console.log('Search on map link is visible');
    } else {
      console.log('Search on map link is not visible');
    }
    expect(visible).toBe(true);
  }
  //#endregion
}
