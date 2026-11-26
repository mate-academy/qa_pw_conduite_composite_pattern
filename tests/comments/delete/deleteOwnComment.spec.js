import { faker } from '@faker-js/faker';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test('Delete own comment', async ({
  api,
  registeredUsers,
  articleWithOneTag,
}) => {
  const user = registeredUsers[0];

  const articleResponse = await api.createArticle(
    articleWithOneTag,
    user.token,
  );

  await api.assertSuccessResponseCode(articleResponse);

  const slug = await api.articles.parseSlugFromResponse(articleResponse);

  const comment = {
    body: faker.lorem.sentence(),
  };

  const commentResponse = await api.createComment(slug, comment, user.token);

  await api.assertSuccessResponseCode(commentResponse);

  const commentId =
    await api.comments.parseCommentIdFromResponse(commentResponse);

  const response = await api.deleteComment(slug, commentId, user.token);

  await api.comments.assertResponseCode(response, 204);
});
