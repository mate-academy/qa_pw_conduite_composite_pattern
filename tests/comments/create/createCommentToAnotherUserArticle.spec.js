import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test('Create comment to another user article', async ({
  api,
  registeredUsers,
  articleWithOneTag,
}) => {
  const articleAuthor = registeredUsers[0];
  const commentAuthor = registeredUsers[1];

  const articleResponse = await api.createArticle(
    articleWithOneTag,
    articleAuthor.token,
  );

  await api.assertSuccessResponseCode(articleResponse);

  const slug = await api.articles.parseSlugFromResponse(articleResponse);

  const comment = {
    body: faker.lorem.sentence(),
  };

  const response = await api.createComment(slug, comment, commentAuthor.token);

  await api.assertSuccessResponseCode(response);

  const commentId = await api.comments.parseCommentIdFromResponse(response);

  expect(commentId).toBeGreaterThan(0);

  await api.comments.assertCommentBodyHasCorrectValue(response, comment.body);

  await api.comments.assertCommentAuthorHasCorrectValue(
    response,
    commentAuthor.username,
  );
});
