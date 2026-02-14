import { test } from '../../_fixtures/fixtures'
import { faker } from '@faker-js/faker';

test('Create new comment without auth token', async ({ registeredUser, api, articleWithOneTag }) => {
  const responseArticle = await api.articles.createArticle(articleWithOneTag, registeredUser.token);

  const createdArticle = await responseArticle.json();
  const slug = createdArticle.article.slug;
  const body = faker.lorem.sentence(5);

  const response = await api.comments.createComment(
    slug,
    body
  );

  await api.comments.assertUnauthorizedResponseCode(response);
});
