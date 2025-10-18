import { HomePage } from './HomePage.js';
import { LoginPage } from './LoginPage.js';

/**
 * Page Object Manager - provides centralized access to all page objects
 */
export class PageObjectManager {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    this.page = page;
    
    // Initialize all page objects
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
  }

  /**
   * Get Home Page instance
   * @returns {HomePage}
   */
  getHomePage() {
    return this.homePage;
  }

  /**
   * Get Login Page instance
   * @returns {LoginPage}
   */
  getLoginPage() {
    return this.loginPage;
  }
}
