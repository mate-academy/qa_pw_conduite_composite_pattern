import { faker } from '@faker-js/faker';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 1 });

test('Create comment without auth token', async ({
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

  const response = await api.createComment(slug, comment, '');

  await api.comments.assertUnauthorizedResponseCode(response);
});
