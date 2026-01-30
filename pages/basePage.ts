import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async goto(path: string) {
    const baseUrl = 'https://herve.myezlab.com/app_dev.php';
    await this.page.goto(`${baseUrl}${path}`);
  }

  async waitForNavigation() {
    await this.page.waitForLoadState('networkidle');
  }
}
