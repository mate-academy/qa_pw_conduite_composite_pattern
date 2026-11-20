import { test } from '../../_fixtures/fixtures';
import { SUCCESS_CODE } from '../../../src/constants/responceCodes';
import { expect } from '@playwright/test';

test.describe('Create comment without body field', () => {
  test.use({ usersNumber: 2 });

  let slug: string;
  let commenter;

  test.beforeEach(async ({ api, registeredUsers }) => {
    const [author, user] = registeredUsers;

    commenter = user;

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

  test('Create new comment without body field', async ({ api }) => {
    const response = await api.createComment(slug, {}, commenter.token);

    expect(response.status()).toBe(SUCCESS_CODE);
  });
});
