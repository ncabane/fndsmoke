import { Page, expect, Locator} from '@playwright/test';

// [Nicolas] Locators and test flow.
// [AI-assisted] Visibility refactored to scrollIntoViewIfNeeded() + expect().toBeVisible({ timeout }).

//#region Page Objects
export class PropertyPage {
  propertyBreadCrumb: Locator;
  propertyPhotos: Locator;
  propertyAbout: Locator;


  constructor(private readonly page: Page) {
    // Header section of the property page
    this.propertyBreadCrumb = this.page.getByLabel('Breadcrumb');
    this.propertyPhotos = this.page.locator('#media');
    this.propertyAbout = this.page.locator('#about');
  }
  //#endregion

  //#region Actions

  // Expects the about section to be visible
  async propertyAboutIsVisible() {
    await this.propertyAbout.scrollIntoViewIfNeeded();
    await expect(this.propertyAbout).toBeVisible({ timeout: 10000 });
    console.log('About section is visible');
  }

  // Expects the photos section to be visible
  async propertyPhotosIsVisible() {
    await this.propertyPhotos.scrollIntoViewIfNeeded();
    await expect(this.propertyPhotos).toBeVisible({ timeout: 10000 });
    console.log('Photos section is visible');
  }
  //#endregion
}
