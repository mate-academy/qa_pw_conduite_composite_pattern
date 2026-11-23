import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { FORBIDDEN } from '../../../src/constants/responceCodes';

test.describe('Delete comment added by another user', () => {
  test.use({ usersNumber: 2 });

  let slug: string;
  let author;
  let commenter;

  test.beforeEach(async ({ api, registeredUsers }) => {
    [author, commenter] = registeredUsers;

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

  test('Delete comment added by another user', async ({ api }) => {
    const created = await api.createComment(
      slug,
      { body: 'Not yours' },
      commenter.token,
    );

    await api.assertSuccessResponseCode(created);

    const commentId = await api.comments.parseCommentIdFromResponse(created);
    const response = await api.deleteComment(slug, commentId, author.token);

    expect(response.status()).toBe(FORBIDDEN);
  });
});
