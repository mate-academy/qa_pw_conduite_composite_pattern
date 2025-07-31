import { BasePage } from './BasePage.js';

/**
 * Login Page Object for Conduit application
 */
export class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    super(page);
    
    // Define selectors as properties for better autocomplete
    this.selectors = {
      // Form elements
      emailInput: 'input[type="email"]',
      passwordInput: 'input[type="password"]',
      signInButton: 'button[type="submit"]',
      
      // Links and navigation
      signUpLink: 'a[href="/register"]',
      
      // Error messages
      errorMessages: '.error-messages li',
      
      // Page elements
      pageTitle: '.auth-page h1',
      form: '.auth-page form'
    };
  }

  /**
   * Navigate to login page
   */
  async goto() {
    await super.goto('/login');
    await this.waitForLoad();
  }

  /**
   * Fill email field
   * @param {string} email - Email address
   */
  async fillEmail(email) {
    await this.fill(this.selectors.emailInput, email);
  }

  /**
   * Fill password field
   * @param {string} password - Password
   */
  async fillPassword(password) {
    await this.fill(this.selectors.passwordInput, password);
  }

  /**
   * Click Sign In button
   */
  async clickSignIn() {
    await this.click(this.selectors.signInButton);
  }

  /**
   * Perform complete login
   * @param {string} email - Email address
   * @param {string} password - Password
   */
  async login(email, password) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSignIn();
  }

  /**
   * Click on Sign Up link
   */
  async clickSignUpLink() {
    await this.click(this.selectors.signUpLink);
  }

  /**
   * Get error messages
   * @returns {Promise<string[]>}
   */
  async getErrorMessages() {
    const errors = await this.page.locator(this.selectors.errorMessages).allTextContents();
    return errors;
  }

  /**
   * Assert login page is loaded
   */
  async assertPageLoaded() {
    await this.assertElementVisible(this.selectors.form);
    await this.assertElementContainsText(this.selectors.pageTitle, 'Sign in');
  }

  /**
   * Assert error message is displayed
   * @param {string} message - Expected error message
   */
  async assertErrorMessage(message) {
    await this.assertElementContainsText(this.selectors.errorMessages, message);
  }
}
