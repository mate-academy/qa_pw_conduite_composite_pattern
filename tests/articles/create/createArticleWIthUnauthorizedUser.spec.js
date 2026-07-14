import { test } from '../../_fixtures/fixtures';

test(`Create article with unauthorized user`, async ({
  api,
  articleWithoutTags,
}) => {
  const token = '';
  const response = await api.articles.createArticle(articleWithoutTags, token);

  await api.articles.assertUnauthorizedResponseCode(response);
});
