import { expect } from '@playwright/test';

/**
 * Base Page Object class that provides common functionality for all page objects
 */
export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param {string} url - URL to navigate to
   */
  async goto(url) {
    await this.page.goto(url);
  }

  /**
   * Wait for page to load completely
   */
  async waitForLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Take a screenshot
   * @param {string} name - Screenshot name
   */
  async screenshot(name) {
    await this.page.screenshot({ path: `${name}.png` });
  }

  /**
   * Get page title
   * @returns {Promise<string>}
   */
  async getTitle() {
    return await this.page.title();
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - CSS selector
   */
  async waitForElement(selector) {
    await this.page.waitForSelector(selector, { state: 'visible' });
  }

  /**
   * Click on element
   * @param {string} selector - CSS selector
   */
  async click(selector) {
    await this.page.click(selector);
  }

  /**
   * Fill input field
   * @param {string} selector - CSS selector
   * @param {string} text - Text to fill
   */
  async fill(selector, text) {
    await this.page.fill(selector, text);
  }

  /**
   * Get text content of element
   * @param {string} selector - CSS selector
   * @returns {Promise<string>}
   */
  async getText(selector) {
    return await this.page.textContent(selector);
  }

  /**
   * Check if element is visible
   * @param {string} selector - CSS selector
   * @returns {Promise<boolean>}
   */
  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  /**
   * Assert element is visible
   * @param {string} selector - CSS selector
   */
  async assertElementVisible(selector) {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  /**
   * Assert element contains text
   * @param {string} selector - CSS selector
   * @param {string} text - Expected text
   */
  async assertElementContainsText(selector, text) {
    await expect(this.page.locator(selector)).toContainText(text);
  }
}
