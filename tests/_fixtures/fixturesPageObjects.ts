import { test as base } from '@playwright/test';
import { PageObjectManager } from '../../src/pages/PageObjectManager.js';

export const test = base.extend({
  pageObjects: async ({ page }, use) => {
    const pageObjectManager = new PageObjectManager(page);
    await use(pageObjectManager);
  },
  
  homePage: async ({ pageObjects }, use) => {
    await use(pageObjects.getHomePage());
  },
  
  loginPage: async ({ pageObjects }, use) => {
    await use(pageObjects.getLoginPage());
  },
});
