import { Page, expect, Locator} from '@playwright/test';

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
  async propertyBreadCrumbIsCorrect() {
    // Assert that the breadcrumb is visible
    const visible = await this.propertyBreadCrumb.isVisible();
    if (visible) {
      console.log('Breadcrumb is visible');
    } else {
      console.log('Breadcrumb is not visible');
    }
    expect(visible).toBe(true);
}

  async propertyAboutIsVisible() {
    // Scroll the About section into view and wait for it to become visible.
    const visible = await this.propertyAbout.isVisible();
    if (visible) {
      console.log('About is visible');
    } else {
      console.log('About is not visible');
    }
    expect(visible).toBe(true);
  }
  async propertyPhotosIsVisible() {
    const visible = await this.propertyPhotos.isVisible();
    if (visible) {
      console.log('Photos is visible');
    } else {
      console.log('Photos is not visible');
    }
    expect(visible).toBe(true);
  }
  //#endregion
}
