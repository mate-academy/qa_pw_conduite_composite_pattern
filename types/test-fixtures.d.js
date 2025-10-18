// Type definitions for better autocomplete in JavaScript files

/**
 * @typedef {Object} TestFixtures
 * @property {import('@playwright/test').Page} page - Playwright page instance
 * @property {import('../../src/pages/HomePage.js').HomePage} homePage - Home page object
 * @property {import('../../src/pages/LoginPage.js').LoginPage} loginPage - Login page object
 * @property {import('../../src/pages/PageObjectManager.js').PageObjectManager} pageObjects - Page object manager
 * @property {import('../../src/api/resources/UsersApi.js').UsersApi} usersApi - Users API client
 * @property {import('../../src/api/resources/ProfilesApi.js').ProfilesApi} profilesApi - Profiles API client
 * @property {import('../../src/api/resources/ArticlesApi.js').ArticlesApi} articlesApi - Articles API client
 * @property {import('../../src/api/ApiComposite.js').ApiComposite} api - Composite API client
 * @property {import('../../src/common/testData/builders/TestDataDirector.js').TestDataDirector} testDataDirector - Test data director
 * @property {Object} user - Generated user data
 * @property {Object} registeredUser - Registered user with token
 * @property {Array<Object>} registeredUsers - Array of registered users
 * @property {Object} articleWithoutTags - Article data without tags
 * @property {Object} articleWithOneTag - Article data with one tag
 * @property {import('../../src/common/logger/Logger.js').Logger} logger - Logger instance
 */

/**
 * @typedef {import('@playwright/test').TestFunction<TestFixtures>} TestFunction
 */
