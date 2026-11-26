import { faker } from '@faker-js/faker';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test('Delete another user comment', async ({
  api,
  registeredUsers,
  articleWithOneTag,
}) => {
  const firstUser = registeredUsers[0];
  const secondUser = registeredUsers[1];

  const articleResponse = await api.createArticle(
    articleWithOneTag,
    firstUser.token,
  );

  await api.assertSuccessResponseCode(articleResponse);

  const slug = await api.articles.parseSlugFromResponse(articleResponse);

  const comment = {
    body: faker.lorem.sentence(),
  };

  const commentResponse = await api.createComment(
    slug,
    comment,
    firstUser.token,
  );

  await api.assertSuccessResponseCode(commentResponse);

  const commentId =
    await api.comments.parseCommentIdFromResponse(commentResponse);

  const response = await api.deleteComment(slug, commentId, secondUser.token);

  await api.comments.assertResponseCode(response, 403);
});
