import { test } from '../../_fixtures/fixtures'; // Adjust the import path as necessary
import { expect } from '@playwright/test';

test.describe('UI Tests - Home Page', () => {
  test('should load home page and display banner', async ({ homePage }) => {
    await homePage.goto();
    await homePage.assertPageLoaded();
    await homePage.assertBannerText();
    
    const title = await homePage.getBannerTitle();
    expect(title.toLowerCase()).toContain('conduit');
  });

  test('should navigate to login page', async ({ homePage, loginPage }) => {
    await homePage.goto();
    await homePage.clickSignIn();
    await loginPage.assertPageLoaded();
  });
});
