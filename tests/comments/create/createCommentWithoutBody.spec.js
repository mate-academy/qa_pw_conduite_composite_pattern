import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test('Create comment without body field', async ({
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

  const response = await api.createComment(slug, {}, user.token);

  await api.comments.assertUnprocessableEntityResponseCode(response);
});
