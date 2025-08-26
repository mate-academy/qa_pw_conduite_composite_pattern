import { test } from '../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

test.use({ usersNumber: 2 });

test('Create new comment to the article created by another user', async ({
  registeredUsers,
  api,
  articleWithOneTag
}) => {
  const [user, commenter] = registeredUsers;

  const responseArticle = await api.articles.createArticle(articleWithOneTag, user.token);
  const createdArticle = await responseArticle.json();
  const slug = createdArticle.article.slug;

  const body = faker.lorem.sentence();
  const response = await api.comments.createComment(slug, body, commenter.token);

  await api.comments.assertSuccessResponseCode(response);
});
