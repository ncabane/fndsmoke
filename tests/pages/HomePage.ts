import { Page, expect, Locator} from '@playwright/test';
import { urls } from '../config/urls';

//#region Page Objects
export class HomePage {
  homepageSearchBar: Locator;
  homepageSearchButton: Locator;
  homepageSearchOnMapLink: Locator;
  homepageFundaHeaderImage: Locator;
  
  constructor(private readonly page: Page)
   {
    this.homepageSearchBar = this.page.getByTestId('search-box')
    this.homepageSearchButton = this.page.getByLabel('SearchBox submit button');
    this.homepageSearchOnMapLink = this.page.getByLabel('Zoek op kaart');
    this.homepageFundaHeaderImage = this.page.locator('img[src*="funda_header.svg"]');
  }
//#endregion

//#region Actions
  async goto() {
    await this.page.goto(urls.home);
  }

  async homepageTitleIsCorrect() {
    await expect(this.page).toHaveTitle(/Funda/i);
  }

  async homepageHasFundaHeaderImage() {
    const visible = await this.homepageFundaHeaderImage.isVisible();
    if (visible) {
      console.log('Funda header image is visible');
    } else {
      console.log('Funda header image is not visible');
    }
    expect(visible).toBe(true);
  }

  async homepageHasSearchBar() {
    const visible = await this.homepageSearchBar.isVisible();
    if (visible) {
      console.log('Search bar is visible');
    } else {
      console.log('Search bar is not visible');
    }
    expect(visible).toBe(true);
  }

  async homepageHasSearchButton() {
    const visible = await this.homepageSearchButton.isVisible();
    if (visible) {
      console.log('Search button is visible');
    } else {
      console.log('Search button is not visible');
    }
    expect(visible).toBe(true);
  }

  async homepageSearchCityDiemen(){
    await this.homepageSearchBar.isVisible();
    await this.homepageSearchBar.fill('Diemen');
    await this.homepageSearchButton.isVisible();
    await this.homepageSearchButton.click();
  }

  async homepageHasSearchOnMapLink() {
    const visible = await this.homepageSearchOnMapLink.isVisible();
    if (visible) {
      console.log('Search on map link is visible');
    } else {
      console.log('Search on map link is not visible');
    }
    expect(visible).toBe(true);
  }
  //#endregion
}