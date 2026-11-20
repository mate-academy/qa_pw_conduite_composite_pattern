import { test } from '../../_fixtures/fixtures';
import { UNAUTHORIZED } from '../../../src/constants/responceCodes';
import { expect } from '@playwright/test';

test.describe('Create comment without auth token', () => {
  test.use({ usersNumber: 1 });

  let slug: string;

  test.beforeEach(async ({ api, registeredUsers }) => {
    const [author] = registeredUsers;

    const article = {
      title: `Comments test ${Date.now()}`,
      description: 'Article for comments tests',
      body: 'Article body',
      tagList: [],
    };

    const response = await api.createArticle(article, author.token);

    await api.assertSuccessResponseCode(response);
    slug = await api.articles.parseSlugFromResponse(response);
  });

  test('Create new comment without auth token', async ({ api }) => {
    const response = await api.createComment(slug, { body: 'No token' });

    expect(response.status()).toBe(UNAUTHORIZED);
  });
});
