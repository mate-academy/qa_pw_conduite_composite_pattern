import { BasePage } from './BasePage.js';

/**
 * Home Page Object for Conduit application
 */
export class HomePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance
   */
  constructor(page) {
    super(page);
    
    // Define selectors as properties for better autocomplete
    this.selectors = {
      // Navigation
      navbar: '.navbar',
      homeLink: 'a[href="/"]',
      signInLink: 'a[href="/login"]',
      signUpLink: 'a[href="/register"]',
      newPostLink: 'a[href="/editor"]',
      settingsLink: 'a[href="/settings"]',
      
      // Main content
      banner: '.banner',
      bannerTitle: '.banner h1',
      bannerSubtitle: '.banner p',
      
      // Article feed
      feedToggle: '.feed-toggle',
      globalFeedTab: '.nav-link[href="#global"]',
      personalFeedTab: '.nav-link[href="#personal"]',
      articlePreview: '.article-preview',
      articleTitle: '.preview-link h1',
      articleDescription: '.preview-link p',
      articleMeta: '.article-meta',
      
      // Tags
      popularTags: '.tag-list',
      tag: '.tag-default',
      
      // Pagination
      pagination: '.pagination',
      pageLink: '.page-link'
    };
  }

  /**
   * Navigate to home page
   */
  async goto() {
    await super.goto('/');
    await this.waitForLoad();
  }

  /**
   * Click on Sign In link
   */
  async clickSignIn() {
    await this.click(this.selectors.signInLink);
  }

  /**
   * Click on Sign Up link
   */
  async clickSignUp() {
    await this.click(this.selectors.signUpLink);
  }

  /**
   * Click on New Post link
   */
  async clickNewPost() {
    await this.click(this.selectors.newPostLink);
  }

  /**
   * Get banner title text
   * @returns {Promise<string>}
   */
  async getBannerTitle() {
    return await this.getText(this.selectors.bannerTitle);
  }

  /**
   * Get banner subtitle text
   * @returns {Promise<string>}
   */
  async getBannerSubtitle() {
    return await this.getText(this.selectors.bannerSubtitle);
  }

  /**
   * Click on Global Feed tab
   */
  async clickGlobalFeed() {
    await this.click(this.selectors.globalFeedTab);
  }

  /**
   * Click on Personal Feed tab
   */
  async clickPersonalFeed() {
    await this.click(this.selectors.personalFeedTab);
  }

  /**
   * Get all article titles from the feed
   * @returns {Promise<string[]>}
   */
  async getArticleTitles() {
    const titles = await this.page.locator(this.selectors.articleTitle).allTextContents();
    return titles;
  }

  /**
   * Click on first article in the feed
   */
  async clickFirstArticle() {
    await this.page.locator(this.selectors.articlePreview).first().click();
  }

  /**
   * Click on a specific tag
   * @param {string} tagName - Name of the tag to click
   */
  async clickTag(tagName) {
    await this.page.locator(this.selectors.tag, { hasText: tagName }).click();
  }

  /**
   * Get all popular tags
   * @returns {Promise<string[]>}
   */
  async getPopularTags() {
    const tags = await this.page.locator(this.selectors.tag).allTextContents();
    return tags;
  }

  /**
   * Assert home page is loaded
   */
  async assertPageLoaded() {
    await this.assertElementVisible(this.selectors.banner);
    await this.assertElementVisible(this.selectors.feedToggle);
  }

  /**
   * Assert banner contains correct text
   */
  async assertBannerText() {
    await this.assertElementContainsText(this.selectors.bannerTitle, 'conduit');
    await this.assertElementContainsText(this.selectors.bannerSubtitle, 'place to share your knowledge');
  }
}
