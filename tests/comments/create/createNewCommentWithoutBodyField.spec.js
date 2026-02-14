import { test } from '../../_fixtures/fixtures'

test('Create new comment without body field', async ({ registeredUser, api, articleWithOneTag }) => {
  const responseArticle = await api.articles.createArticle(articleWithOneTag, registeredUser.token);

  const createdArticle = await responseArticle.json();
  const slug = createdArticle.article.slug;

  const response = await api.comments.createComment(
    slug,
    '',
    registeredUser.token
  );

  await api.comments.assertUnprocessableEntityResponseCode(response);
});
