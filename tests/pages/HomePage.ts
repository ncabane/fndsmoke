import { Page, expect } from '@playwright/test';
import { urls } from '../config/urls';

export class HomePage {
  fundaLogo: any;
  constructor(private readonly page: Page)
   {
    this.fundaLogo = this.page.getByAltText('Funda Logo');


  }

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
  // Add more reusable interactions and assertions for the homepage here
  // e.g. search box, navigation, footer, etc.
}

