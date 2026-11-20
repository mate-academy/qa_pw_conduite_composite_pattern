import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { NO_CONTENT } from '../../../src/constants/responceCodes';

test.describe('Delete comment added by the same user', () => {
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

  test('Delete comment added by the same user', async ({ api }) => {
    const created = await api.createComment(
      slug,
      { body: 'Mine' },
      commenter.token,
    );

    await api.assertSuccessResponseCode(created);

    const commentId = await api.comments.parseCommentIdFromResponse(created);
    const response = await api.deleteComment(slug, commentId, commenter.token);

    expect(response.status()).toBe(NO_CONTENT);
  });
});
